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

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess
        }
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
