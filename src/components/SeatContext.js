import React, { useState } from "react";

export const SeatContext = React.createContext();

const InitialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "receive-seat-info-from-server": {
      console.log("Running reducer receive-seat-info-from-server");
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
    }
    case "mark-seat-as-purchased": {
      console.log("Running reducer mark-Seat-As-Purchased", action.seatId);
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.seatId]: { ...state.seats[action.seatId], isBooked: true },
        },
      };
    }

    default:
      throw new Error(`Unrecognized action in Seat Context: ${action.type}`);
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };

  const markSeatAsPurchased = (seatId) => {
    console.log(`markSeatAsPurchased`, seatId);
    dispatch({
      seatId,
      type: "mark-seat-as-purchased",
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markSeatAsPurchased,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
