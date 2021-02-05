import React from 'react';
import ReactDOM from 'react-dom';

export const BookingContext = React.createContext();

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
};

function reducer(state, action) {
    switch(action.type) {
        case 'begin-booking-process': {
            return {
                ...state,
                status: action.status,
                selectedSeatId: action.seatId,
                price: action.seatPrice,
            }
        }
        default:
            throw new Error(`Unrecognized action: ${action.type}`);
    }
}

export const BookingProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const beginBookingProcess = (data) => {
        dispatch({
            type: "begin-booking-process",
            ...data,
        });
    };

    return (
        <BookingContext.Provider
        value={{
            state,
            actions: {
                beginBookingProcess,
            },
        }}
>
    {children}
</BookingContext.Provider>
    )
}