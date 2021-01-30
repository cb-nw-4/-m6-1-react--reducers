import React, { useEffect, useState } from "react";

export const BookingContext = React.createContext();

const InitialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "begin-booking-process": {
      console.log("Running reducer begin-booking-process", action);
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seatId,
        price: action.price,
      };
    }
    case "cancel-booking-process": {
      console.log("Running reducer cancel-booking-process", action);
      return {
        ...InitialState,
      };
    }
    case "purchase-ticket-request": {
      return {
        ...state,
        status: "awaiting-response",
      };
    }
    case "cancel-booking-process": {
      console.log("Running reducer cancel-booking-process", action);
      return {
        ...InitialState,
      };
    }
    case "purchase-ticket-success": {
      console.log("Running reducer purchase-ticket-success", action);
      return {
        ...state,
        status: "purchased",
        error: null,
        price: null,
      };
    }
    case "purchase-ticket-failure": {
      console.log("Running reducer purchaseTicketFailure", action);
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    }

    case "reset-booking-process": {
      console.log("Running reducer purchaseTicketFailure", action);
      return {
        ...InitialState,
      };
    }

    default:
      throw new Error(`Unrecognized action in Booking Context: ${action.type}`);
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, InitialState);
  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  const beginBookingProcess = (seatId, price) => {
    dispatch({
      type: "begin-booking-process",
      seatId: seatId,
      price: price,
    });
  };

  const cancelBookingProcess = () => {
    dispatch({
      type: "cancel-booking-process",
    });
  };

  const purchaseTicketRequest = () => {
    dispatch({
      type: "purchase-ticket-request",
      seatId: state.selectedSeatId,
      creditCard: creditCard,
      expiration: expiration,
    });
    fetch("/api/book-seat", {
      method: "POST",
      body: JSON.stringify({
        seatId: state.selectedSeatId,
        creditCard: creditCard,
        expiration: expiration,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (json.status === 200) purchaseTicketSuccess();
        else if (json.status === 500) purchaseTicketFailure("Network Error!");
        else if (json.message === "This seat has already been booked!")
          purchaseTicketFailure("This seat has already been booked!");
        else if (
          json.message ===
          "An unknown error has occurred. Please try your request again."
        )
          purchaseTicketFailure(
            "An unknown error has occurred. Please try your request again."
          );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const purchaseTicketFailure = (error) => {
    dispatch({
      error: error,
      type: "purchase-ticket-failure",
    });
  };

  const purchaseTicketSuccess = () => {
    dispatch({
      type: "purchase-ticket-success",
    });
  };

  const resetBookingProcess = () => {
    dispatch({
      type: "reset-booking-process",
    });
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <BookingContext.Provider
      value={{
        creditCard,
        setCreditCard,
        expiration,
        setExpiration,
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          resetBookingProcess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
