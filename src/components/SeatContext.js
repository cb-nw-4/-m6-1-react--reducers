import React, { createContext } from "react";

export const SeatContext = createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  // console.log(action);
  switch (action.type) {
    case "receive-seat-info-from-server": {
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
    }
    case "mark-seat-as-purchased": {
      const seat = action.seatId;
      const price = action.price;
      return {
        ...state,
        seats: {
          ...action.seats,
          [seat]: { price: price, isBooked: true },
        },
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };

  const MarkSeatAsPurchased = (data) => {
    dispatch({
      type: "mark-seat-as-purchased",
      ...data,
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          MarkSeatAsPurchased,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
