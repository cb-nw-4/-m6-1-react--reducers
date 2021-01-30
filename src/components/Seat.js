import React, { useContext } from 'react';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

import seatSrc from '../assets/seat-available.svg';
import { BookingContext } from './BookingContext';

const SeatBtn = styled.button`
    border: none;
`;

const Seat = ({ rowName, seatIndex, price, isBooked }) => {
    const { 
        actions: { beginBookingProcess }
    } = useContext(BookingContext);

    const seatInfo = {
        seatId: {
            row: rowName,
            seat: seatIndex
        },
        price: price
    }

    const handleClickSeat = (data) => {
        beginBookingProcess(data);
    }

    return (
        <Tippy content={<div>
            <div>{`Row ${rowName}, Seat ${seatIndex + 1} - $${price}`}</div>
        </div>}>
            <SeatBtn 
                disabled={isBooked && true} 
                onClick={() => handleClickSeat(seatInfo)}
            >
                <img 
                    alt='seat' 
                    src={seatSrc}
                    style={{filter: isBooked && 'grayscale(100%)'}}
                />
            </SeatBtn>
        </Tippy>
    );
}

export default Seat;