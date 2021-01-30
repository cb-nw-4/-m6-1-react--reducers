import React, {createContext, useReducer } from 'react';


export const BookingContext = createContext(null);

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
  };

const reducer = (state, action)=>{
    switch (action.type){
        case 'begin-booking-process' :{         
            return {
                ...state,
                status: action.status,
                selectedSeatId: action.selectedSeatId,
                price: action.price
            }
        }
        case 'cancel-booking-process' :{
            return { ...initialState }
        }
        case 'purchase-ticket-request' :{         
            return {
                ...state,
                status: "awaiting-response", 
                error: null               
            }
        }
        case 'purchase-ticket-failure' :{     
            console.log('action.error', action)    
            return {
                ...state,
                status: "error",   
                error: action.error,             
            }
        }
        case 'purchase-ticket-success' :{         
            return {
                ...state,
                status: "purchased",   
                error: null, 
                selectedSeatId: null,
                price: null            
            }
        }
        default: throw new Error('unrecognized action: ' + action.type);

    }
};

export const BookingProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    const beginBookingProcess =(data) => {
        dispatch({
            type: "begin-booking-process",
            ...data,
        });
    };

    const cancelBookingProcess = () => {
        dispatch({
            type: 'cancel-booking-process',         
        });
    };

    const purchaseTicketRequest = () => {
        dispatch({
            type: 'purchase-ticket-request',         
        });
    };

    const purchaseTicketFailure = (error) => {
        console.log('purchaseTicketFailure', error);
        dispatch({
            type: 'purchase-ticket-failure',   
            error      
        });
    };

    const purchaseTicketSuccess = () => {
        dispatch({
            type: 'purchase-ticket-success',         
        });
    };

    return(
        <BookingContext.Provider
            value={{
                state,
                action: {
                    beginBookingProcess,
                    cancelBookingProcess,
                    purchaseTicketRequest,
                    purchaseTicketFailure,
                    purchaseTicketSuccess
                },
            }}
        >
            {children}
        </BookingContext.Provider>

    );
};