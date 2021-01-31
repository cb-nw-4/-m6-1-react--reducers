import React, { createContext, useReducer } from "react";

export const BookingContext = React.createContext();

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
  };
  function reducer(state, action) {
    console.log(action.type);
    console.log(state)
    switch (action.type) {
        case "BEGIN_BOOKING_PROCESS":
          return {
            ...state,
            status: "seat-selected",
            selectedSeatId: action.seatId,
            price: action.seatPrice,
        }
        
        default:
          throw new Error(`Invalid Action: ${ action.type} `);
      }
  }
  export const BookingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const beginBookingProcess = (data) => {
      dispatch({
        type: "BEGIN_BOOKING_PROCESS",
        ...data,
      });
    };
  
    return (
      <BookingContext.Provider
        value={{
          state, 
          actions: { beginBookingProcess },
        }}
      >
        {children}
      </BookingContext.Provider>
    );
  };
  