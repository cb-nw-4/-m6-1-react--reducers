import React from 'react';
import styled from 'styled-components';

import { SeatContext } from './SeatContext';
import SeatSrc from "../assets/seat-available.svg";
import Tippy from '@tippyjs/react';
import { Tooltip } from '@material-ui/core';
import 'tippy.js/dist/tippy.css';

const Seat = ({ rowIndex, rowName, seatIndex, width, height, price, status }) => {
        const handleOnClick = () => {
            console.log('Clicked')
        }
    
    return(
        <Wrapper>
        {status ? (
            <button disable={true}>
                <img className="grayOut" src ={SeatSrc}/>
            </button>
        ):(
            <Tippy
                content={`Row ${rowName}, Seat ${seatIndex + 1} - $${price}`}
            >
                <button onClick={handleOnClick}>
                    <img src={SeatSrc}/>
                </button>
            </Tippy>
        )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .grayOut{
        filter: grayscale(100%);
    }
    p{
        color: black;
        position: absolute;
    }
    button{
        outline: none;
        border: none;
    }
`;

export default Seat;