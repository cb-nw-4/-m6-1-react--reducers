import React from "react";
import { BookingContext } from "./BookingContext";
import styled from 'styled-components';
import seatAvailable from "../assets/seat-available.svg";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Seat = ({ rowIndex, seatIndex, seatId, width, height, price, seatStatus}) => {
  
    const {
        actions: { beginBookingProcess }
    } = React.useContext(BookingContext);

    return (
        <Tippy content={`Row ${rowIndex}, Seat ${seatIndex} — $${price}`}>
            <Button disabled={seatStatus} onClick={() => beginBookingProcess({status: "seat-selected", seatId, price})}>
                <img 
                    alt="seat" 
                    src={seatAvailable} 
                    style={{ width, height, filter: seatStatus ? "grayscale(100%)": null }} 
                />
            </Button>
        </Tippy>

    )
};

const Button = styled.button`
    border: none;

    &:focus {
        outline: 2px solid #1F55DB;
    }
`;

export default Seat;