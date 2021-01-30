import React, {useContext} from "react";
import styled from "styled-components";

import { BookingContext } from './BookingContext.js';
import availableSeats from "../assets/seat-available.svg";
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

const Seat = ({rowName, seatIndex, price, status, width, height}) => {
    const {
        state: {bookingStatus, selectedSeatId},
        actions: {beginBookingProcess}
    } = useContext(BookingContext);

    return (
        <Button
            disabled={status === "unavailable" ? true : false}
            style={{width: width, height: height}}
            onClick={() => beginBookingProcess({
                bookingStatus: 'seat-selected',
                selectedSeatId: `${rowName}-${seatIndex + 1}`,
                price: price
            })}
        >
            <Tippy content={`Row ${rowName}, Seat ${seatIndex + 1} - $ ${price}`}>
                {status === "unavailable"
                ? <Image src={availableSeats} alt="seat" style={{filter: "grayscale(100%)"}} />
                : <Image src={availableSeats} alt="seat"/>
                }
            </Tippy>
        </Button>
    )
}

const Button = styled.button`
    border-style: none;
    margin: 5px;
`;

const Image = styled.img`
    position: relative;
    margin-left: -10px;
    right: 100%;
    display: block;
    width: 40px;
    height: 40px;
`;

export default Seat;

// style={{width: 30, height: 30}}