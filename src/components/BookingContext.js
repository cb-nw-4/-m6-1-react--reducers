import React from 'react';

export const BookingContext = React.createContext();

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
  };

  function reducer(state, action) {
    switch(action.type){

      case 'begin-booking-process':
        return {
          ...state,
          status: 'seat-selected',
          selectedSeatId: action.seatId,
          price: action.price,
        };

        case 'clear-selection':
          return {
            status: 'idle',
            selectedSeatId: null,
            price: null,
          };

      case 'try-purchase':
        return {
          ...state,
          status: 'awaiting-response',
          error: null
        };
      
      case 'incorrect-form':
        return {
          ...state,
          status: 'error',
          error: true,
        };
      
      case 'purchase-successful':
        return {
          ...initialState,
          status: 'purchased',
        };



      default:
        throw new Error('Reducer Error:', action.type); 
    }
  }

  export const BookingProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
  
    // Action creators
    const beginBookingProcess = (seatId,price) => {
      dispatch({
        type: "begin-booking-process",
        seatId: seatId,
        price: price
      });
      console.log("booking process");
    };

    const clearSelection = () => {
      dispatch({type: "clear-selection"});
      console.log("clear-selection");
    };
  
    return (
      <BookingContext.Provider
        value={{
          state,
          actions: {
            beginBookingProcess, clearSelection
          },
        }}
      >
        {children}
      </BookingContext.Provider>
    );
  };