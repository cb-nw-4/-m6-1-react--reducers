import React from 'react';
import {produce} from'immer';

export const SeatContext = React.createContext();

const initialState = {
    hasLoaded: false,
    seats: null,
    numOfRows: 0,
    seatsPerRow: 0,
};


function reducer(state, action) {
    // TODO
    
    switch(action.type){
        case 'receive-seat-info-from-server':{
            return{
                ...state,
                hasLoaded: true,
                seats: action.seats,
                numOfRows: action.numOfRows,
                seatsPerRow: action.seatsPerRow,
            }
        }
        case 'mark-seat-as-purchased':{

            return produce(state, (draftState) =>{
                draftState.map(seat => 
            seat.seatId !== action.seatId ? seat : { ...seat, isBooked: true})

        })
    }

    default: 
        throw new Error (`Unrecognized action: ${action.type}`)
    }

}

export const SeatProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const receiveSeatInfoFromServer = (seatId) => {
        console.log('data received ', seatId )
    dispatch({
        type: "receive-seat-info-from-server",
            ...seatId,
    
    });
    };

    const markSeatAsPurchased = (data) => {
        console.log('data marke sold', data, state)
    dispatch({
        type: "receive-seat-info-from-server",
        ...data,
    });
    };

    return (
        <SeatContext.Provider
            value={{
            state,
            actions: {
                receiveSeatInfoFromServer,
                markSeatAsPurchased
            },
            }}
    >
        {children}
    </SeatContext.Provider>
    );
};