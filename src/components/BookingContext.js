import React, { useReducer } from 'react';

export const BookingContext = React.createContext();

const initialState = {
    status: 'idle',
    error: null,
    selectedSeatId: null,
    price: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'begin-booking-process': {
            return {
                ...state,
                status: 'seat-selected',
                selectedSeatId: action.seatId,
                price: action.price
            }
        }
        case 'cancel-booking-process': {
            return {
                ...state,
                status: 'idle',
                error: null,
                selectedSeatId: null,
                price: null
            }
        }
        case 'purchase-ticket-request': {
            return {
                ...state,
                status: 'awaiting-response',
                error: null
            }
        }
        case 'purchase-ticket-failure': {
            return {
                ...state,
                status: 'error',
                error: 'Please provide credit card information!'
            }
        }
        case 'purchase-ticket-already-taken': {
            return {
                ...state,
                status: 'error',
                error: 'This seat has already been booked!'
            }
        }
        case 'purchase-ticket-unknown-error': {
            return {
                ...state,
                status: 'error',
                error: 'An unknown error has occurred. Please try your request again.'
            }
        }
        case 'purchase-ticket-success': {
            return {
                ...state,
                status: 'purchased',
                error: null,
                selectedSeatId: null,
                price: null
            }
        }
        case 'dismiss-purchase': {
            return {
                ...state,
                status: 'idle'
            }
        }
        default:
            throw new Error('Unrecognized action');
    }
}

export const BookingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const beginBookingProcess = (data) => {
        dispatch({
            type: 'begin-booking-process',
            ...data,
        });
    }

    const cancelBookingProcess = () => {
        dispatch({
            type: 'cancel-booking-process'
        });
    }

    const purchaseTicketRequest = () => {
        dispatch({
            type: 'purchase-ticket-request'
        });
    }

    const purchaseTicketFailure = () => {
        dispatch({
            type: 'purchase-ticket-failure'
        });
    }

    const purchaseTicketSuccess = () => {
        dispatch({
            type: 'purchase-ticket-success'
        });
    }

    const purchaseTicketAlreadyTaken = () => {
        dispatch({
            type: 'purchase-ticket-already-taken'
        });
    }

    const purchaseTicketUnknownError = () => {
        dispatch({
            type: 'purchase-ticket-unknown-error'
        });
    }

    const dismissPurchase = () => {
        dispatch({
            type: 'dismiss-purchase'
        });
    }

    return (
        <BookingContext.Provider
            value={{
                ...state,
                actions: {
                    beginBookingProcess,
                    cancelBookingProcess,
                    purchaseTicketRequest,
                    purchaseTicketFailure,
                    purchaseTicketSuccess,
                    purchaseTicketAlreadyTaken,
                    purchaseTicketUnknownError,
                    dismissPurchase
                }
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}