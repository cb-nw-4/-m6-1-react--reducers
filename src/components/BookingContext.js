import React, { createContext, useReducer } from "react";

export const BookingContext = createContext();

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
};

const reducer = (state, action) => {
    //   console.log(action);
    //   console.log(state);
    switch (action.type) {
        case "begin-booking-process": {
            return {
                seat: action.seat,
                ...state,
                status: "seat-selected",
                selectedSeatId: action.seatId,
            };
        }
        case "purchase-ticket-request": {
            return {
                ...state,
                status: "awaiting-response",
            };
        }
        case "purchase-ticket-failure": {
            return {
                ...state,
                status: "error",
                error: "Please provide valid credit card informations!",
            };
        }
        case "purchase-ticket-success": {
            return {
                ...state,
                status: "purchased",
                error: null,
                selectedSeatId: null,
                price: null,
            };
        }
        case "purchase-ticket-canceled": {
            return {
                ...initialState,
            };
        }
        default:
            throw new Error(`Unrecognised action ${action.type}`);
    }
};

export const BookingProvider = ({ children }) => {
    const [bookingInfos, dispatch] = useReducer(reducer, initialState);

    const purchaseRequest = () => {
        dispatch({
            type: "purchase-ticket-request",
        });
    };
    const purchaseSuccess = () => {
        dispatch({
            type: "purchase-ticket-success",
        });
    };
    const purchaseFailure = () => {
        dispatch({
            type: "purchase-ticket-failure",
        });
    };
    const purchaseCanceled = () => {
        dispatch({
            type: "purchase-ticket-canceled",
        });
    };

    const updatingBookingInfo = (data) => {
        // console.log(data);
        dispatch({
            type: "begin-booking-process",
            ...data,
        });
    };

    return (
        <BookingContext.Provider
            value={{
                bookingInfos,
                actions: {
                    updatingBookingInfo,
                    purchaseRequest,
                    purchaseSuccess,
                    purchaseFailure,
                    purchaseCanceled,
                },
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};
