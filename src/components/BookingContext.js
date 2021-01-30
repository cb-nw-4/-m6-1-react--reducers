import React, { createContext, useReducer } from "react";
export const BookingContext = createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "begin-booking-process": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "cancel-booking-process": {
      return {
        ...state,
        ...initialState,
      };
    }
    case "purchase-ticket-request": {
      return {
        ...state,
        status: "awaiting-response",
        selectedSeatId: state.selectedSeatId,
        price: state.price,
      };
    }
    case "purchase-ticket-failure": {
      return {
        ...state,
        status: "error",
        error: "Please provide credit card information",
      };
    }
    case "purchase-ticket-success": {
      return {
        ...state,
        status: "purchased",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const beginBookingProcess = (data) => {
    dispatch({
      type: "begin-booking-process",
      payload: data,
    });
  };
  const cancelBookingProcess = () => {
    dispatch({
      type: "cancel-booking-process",
    });
  };
  const purchaseTicketRequest = (data) => {
    dispatch({
      type: "purchase-ticket-request",
      payload: data,
    });
  };

  const purchaseTicketFailure = () => {
    dispatch({
      type: "purchase-ticket-failure",
    });
  };

  const purchaseTicketSuccess = () => {
    dispatch({
      type: "purchase-ticket-success",
    });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketFailure,
          purchaseTicketSuccess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
