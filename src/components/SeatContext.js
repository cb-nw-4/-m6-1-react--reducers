import React, { createContext, useReducer } from "react";

export const SeatContext = React.createContext();

const initialState = {
  hasloaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  console.log(action);

  switch (action.type) {
    case "receive-seat-info-from-server":
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
    default:
      throw new Error(`Invalid Action: ${ action.type} `);
  }
}
export const SeatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: { receiveSeatInfoFromServer },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
