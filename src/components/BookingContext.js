import React, { createContext, useReducer } from 'react';

export const BookingContext = createContext();

const initialState = {
  status: 'idle',
  error: null,
  selectedSeatId: null,
  price: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'begin-booking-process':
      return {
        ...state,
        status: 'seat-selected',
        selectedSeatId: action.selectedSeatId,
        price: action.price
      };
    case 'cancel-booking-process':
      return initialState;
    case 'purchase-ticket-request':
      return {
        ...state,
        status: 'awaiting-response'
      }
    case 'purchase-ticket-failure':
      return {
        ...state,
        status: 'error',
        error: action.error
      }
      case 'purchase-ticket-success':
        return {
          ...initialState,
          status: 'purchased'
        }
    default:
      throw new Error (`Action type ${action.type} not valid`);
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const beginBookingProcess = (data) => {
    dispatch({
      type: 'begin-booking-process',
      ...data
    });
  };

  const cancelBookingProcess = () => {
    dispatch({
      type: 'cancel-booking-process'
    });
  };

  const purchaseTicketFailure = (data) => {
    dispatch({
      type: 'purchase-ticket-failure',
      ...data
    });
  };

  const purchaseTicketSuccess = () => {
    dispatch({
      type: 'purchase-ticket-success'
    });
  };

  const purchaseTicketRequest = (event, selectedSeatId, creditCard, expiration) => {
    event.preventDefault();
    dispatch({
      type: 'purchase-ticket-request',
    });

    // Send request to server
    fetch('http://localhost:3000/api/book-seat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId: selectedSeatId, creditCard: creditCard, expiration: expiration })
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          purchaseTicketSuccess();
        } else {
          purchaseTicketFailure({ error: json.message });
        }
      })
      .catch(() => {
        cancelBookingProcess();
      });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest
        }
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
