import React from 'react';

export const BookingContext = React.createContext();

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
    creditCard: '' , 
    expiration: '',
};

function reducer(state, action){
    switch(action.type){
        case 'begin-booking-process':{
            return{
                ...state,
                status: 'seat-selected',
                ...action.payload,
            }
        }
        case 'purchase-ticket-request':{
            return{
                ...state,
                status: 'awaiting-response',
                ...action.payload,
            }
        }
        case 'purchase-ticket-failure':{
            return{
                ...state,
                status: 'error',
                ...action.payload,
            }
        }
        case 'purchase-ticket-success':{
            return{
                ...state,
                status: 'purchased',
                ...action.payload,
            }
        }
        case 'update-field':{
            return{
                ...state,
                [action.key]: action.value
            };
        }
        case 'rest-status':{
            return{
                ...state,
                ...action.payload
            };
        }


    default:
        throw new Error (`Unrecognized action: ${action.type}`)
    }    

}

export const BookingProvider = ({children}) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const beginBookingProcess = (data)=>{

        console.log('data begin', data)
        dispatch({
            type: 'begin-booking-process',
            payload: data,
        })
    }

    const ErrorDuringProcess = (data)=>{
        dispatch({
            type: 'purchase-ticket-failure',
            payload: data,
        })
        console.log('data error', data)
    }


    const updateField = (key, value) => {
        //console.log('value', key)
        dispatch({ type: 'update-field', key, value});
    }

    const EndBookingProcess = (data)=>{

        dispatch({
            type: 'purchase-ticket-success',
            payload: data,
        })
        console.log('data End', data, state)
    }

    const DuringBookingProcess = (data)=>{

        console.log('data Process', data)
        dispatch({
            type: 'purchase-ticket-request',
            payload: data,
        })
    }
    const RestStatus = (data)=>{
        console.log('rest Process', data)
        dispatch({
            type: 'rest-status',
            payload: data,
        })
    }



    return (
        <BookingContext.Provider
            value={{
                state,                    
                actions:{
                    beginBookingProcess,
                    ErrorDuringProcess,
                    EndBookingProcess,
                    DuringBookingProcess,
                    updateField,
                    RestStatus,


                },
            }}
            >
                {children}
        </BookingContext.Provider>);
}

