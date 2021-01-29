import React, { createContext } from 'react';

export const BookingContext = createContext();

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "begin-booking-process": {
            return {
                ...state,
                status: "seat-selected",
                selectedSeatId: action.seatId,
                price: action.seatPrice,
            }
        }
        case "purchase-ticket-request": {
            return {
                ...state,
                status: "awaiting-response"
            }
        }
        case "purchase-ticket-failure": {
            return {
                ...state,
                status: "error", 
                error: action.message
            }
        }
        case "purchase-ticket-success": {
            return {
                ...state,
                status: "purchased", 
                error: null,
                selectedSeatId: null,
                price: null
            }
        }
        case "cancel-booking-process": {
            return { 
                ...state,
                status: "idle",
                error: null,
                selectedSeatId: null,
                price: null,
            }
        }
        default: 
            throw new Error(`Unrecognized action: ${action.type}`);
    };
}

export const BookingProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    const BeginBookingProcess = (data) => {
        dispatch({
            type: "begin-booking-process",
            ...data,
        });
    };

    const PurchaseTicketRequest =()=>{
        dispatch({
            type: "purchase-ticket-request",
        });
    };

    const PurchaseTicketFailure = (data)=> {
        dispatch({
            type: "purchase-ticket-failure",
            ...data
        });
    };

    const PurchaseTicketSuccess = ()=>{
        dispatch({
            type:"purchase-ticket-success",
        });
    };

    const CancelBookingProcess = () => {
        dispatch({
            type: "cancel-booking-process",
        });
    };
    
    return (
        <BookingContext.Provider
            value={{
                state,
                actions: {
                    BeginBookingProcess,
                    CancelBookingProcess,
                    PurchaseTicketRequest,
                    PurchaseTicketFailure,
                    PurchaseTicketSuccess
                },
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};