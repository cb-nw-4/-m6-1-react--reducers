import React, { useContext } from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import seatSrc from '../assets/seat-available.svg';
import { BookingContext } from './BookingContext';


const Seat = ({rowName, seatNumber, seatPrice, seatStatus }) => {

    const {
            actions: {
                beginBookingProcess,
            }
    } = useContext(BookingContext);

    const seatId = `${rowName}-${seatNumber}`

    return (
        <div>
            <Tippy content={`Row ${rowName}, Seat ${seatNumber} - Price $${seatPrice}`} >
                <Button
                onClick={() => {
                    beginBookingProcess({
                        status: "seat-selected",
                        seatId,
                        seatPrice,
                    })
                }}
                disabled={seatStatus}>
                    <SeatImg
                    alt="seat"
                    src={seatSrc}
                    seatStatus={seatStatus}
                    />
                </Button>
            </Tippy>
        </div>
    )

}

const SeatImg = styled.img`
width: 36px;
height: 36px;
filter: ${props => (props.seatStatus ? "grayscale(100%)" : "")};
`;

const Button = styled.button`
border: none;
`;

export default Seat;