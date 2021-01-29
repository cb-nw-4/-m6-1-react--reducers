import React, { useReducer } from 'react';

export const BookingContext=React.createContext(null);

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
};

const reducer=(state, action)=>{
    switch(action.type){
        case 'begin-booking-process':{
            return{
                ...state,
                status: 'seat-selected',
                selectedSeatId: action.seatId,
                price: action.price,
            }
        }
        case 'cancel-booking-process':{
            return{
                ...state,
                status: 'idle',
                selectedSeatId: null,
                price: null,
            }
        }
        default: {
            return(
                `Doesn't recognise action type ${action.type}.`
            )
        }
    }
}

const BookingProvider=({children})=>{
    const [state, dispatch]=useReducer(reducer, initialState);

    const beginBookingProcess=(data)=>{
        dispatch({
            type:'begin-booking-process',
            ...data
        })
    }
    const cancelBookingProcess=(data)=>{
        dispatch({
            type:'cancel-booking-process',
            ...data,
        })
    }

    return(
        <BookingContext.Provider 
            value={{
                ...state,
                actions:{
                    beginBookingProcess,
                    cancelBookingProcess,
                }
            }}
        >
            {children}
        </BookingContext.Provider>
    )
}

export default BookingProvider;