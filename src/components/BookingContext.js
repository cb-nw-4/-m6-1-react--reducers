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

        case 'purchase-ticket-request':
          return {
            ...state,
            status: 'awaiting-response',
            error: null
          };

        case 'clear-selection':
          return {
            status: 'idle',
            selectedSeatId: null,
            price: null,
          };
      
      case 'purchase-ticket-failure':
        return {
          ...state,
          status: action.error,
          error: true,
        };
      
      case 'purchase-ticket-success':
        return {
          ...state,
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

    const purchaseRequest= () => {
      dispatch({type: "purchase-ticket-request"});
      console.log("purchase-ticket-request");
    };

    const purchaseFailed= (error) => {
      dispatch({type: "purchase-ticket-failure",error});
      console.log("purchase-ticket-failure");
    };

    const purchaseSuccess= () => {
      dispatch({type: "purchase-ticket-success"});
      console.log("purchase-ticket-success");
    };

    return (
      <BookingContext.Provider
        value={{
          state,
          actions: {
            beginBookingProcess, 
            clearSelection,
            purchaseRequest,
            purchaseFailed,
            purchaseSuccess
          },
        }}
      >
        {children}
      </BookingContext.Provider>
    );
  };