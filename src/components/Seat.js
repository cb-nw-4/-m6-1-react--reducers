import React from 'react';
import styled from 'styled-components';
import { BookingContext } from './BookingContext';
import SeatSvg from '../assets/seat-available.svg'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import PurchaseModal from './PurchaseModal';

const Seat=({seatId, rowName, seatNumber, status, price})=>{
    const {
        selectedSeatId, 
        actions:{ beginBookingProcess,  
            cancelBookingProcess,
        }
    } = React.useContext(BookingContext);

    // const [open, setOpen] = React.useState(false);

    
    // const handleClickOpen = () => {
    //         beginBookingProcess({seatId, price})
    //         setOpen(true);
    // };

    // const handleClose = () => {
    //     cancelBookingProcess();
    //     setOpen(false);
    // };

    return(
        <>
        {/* <PurchaseModal 
            open={open}
            handleClose={handleClose}
        /> */}
        <Tippy interactive={true} content={`Row: ${rowName}, Seat: ${seatNumber}, Price: $${price}`}>
            <Button disabled={status==="unavailable" ? true : false}
                    onClick={()=>{beginBookingProcess({seatId, price})}}
            >
                <img    src={SeatSvg}
                        style={{filter: status==="unavailable" ? "grayscale(100%)" : ""}}
                    />
            </Button>
        </Tippy>
        </>
    );
};

const Button=styled.button`
    outline:none;
    border:none;
`;

export default Seat;