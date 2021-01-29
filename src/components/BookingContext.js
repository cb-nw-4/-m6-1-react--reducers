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
        ...action.payload
      };
    }
    case "cancel-booking-process": {
      return {
        ...state,
        ...initialState
      };
    }
    default: 
      throw new Error(`Unrecognized action: ${action.type}`)
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
      type: 'cancel-booking-process'
    })
  }
  return (
    <BookingContext.Provider
      value={{ state, actions: { beginBookingProcess, cancelBookingProcess } }}
    >
      {children}
    </BookingContext.Provider>
  );
};
