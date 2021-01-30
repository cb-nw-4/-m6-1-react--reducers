import React from "react";
import styled from "styled-components";
import { ReactComponent as SeatIcon } from "../assets/seat-available.svg";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Seat = ({rowName, seatNum, width, height, price, status })=>{
    
    return <>
    <Tippy content={`Row ${rowName}, Seat ${seatNum} - $${price}`}>
        <Button 
            id="button" aria-describedby="tooltip"
            disabled={status==="unavailable"? true:false}>
            <SeatIcon style={{width:`${width}`, height:`${height}`}}/>
        </Button>
    </Tippy>
    </>
};

const Button = styled.button`
    margin: 0;
    padding: 0;
    outline: none;
    border: none;

    &:hover,&:enabled{
        cursor: pointer;
    }

    &:disabled{
        filter: grayscale(100%);
        outline: none;
        cursor: auto;
    }
`;

export default Seat;

