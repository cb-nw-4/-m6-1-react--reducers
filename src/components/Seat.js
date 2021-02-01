import React from "react";
import styled from 'styled-components';
import seatAvailable from "../assets/seat-available.svg";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Seat = ({ rowIndex, seatIndex, width, height, price, status}) => {

    return (
        <Tippy content={`Row ${rowIndex}, Seat ${seatIndex} — $${price}`}>
            <Button disabled={status}>
                <img 
                    alt="seat" 
                    src={seatAvailable} 
                    style={{ width, height, filter: status ? "grayscale(100%)": null }} 
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