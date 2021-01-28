import React from 'react';
import styled from 'styled-components';
import SeatSvg from '../assets/seat-available.svg'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Seat=({id, rowName, seatNumber, status, price})=>{
    // console.log(id, rowName, seatNumber);
    return(
        <>
        <Tippy interactive={true} content={`Row: ${rowName}, Seat: ${seatNumber}, Price: $${price}`}>
            <Button disabled={status==="unavailable" ? true : false}>
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