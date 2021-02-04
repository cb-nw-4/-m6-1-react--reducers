import React, { useContext } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styled from "styled-components";
import seatAvailable from "../assets/seat-available.svg";
import { BookingContext } from "./BookingContext";

export const Seat = ({ seat, rowIndex, seatIndex, price, status, seatId }) => {
    const {
        actions: { updatingBookingInfo },
    } = useContext(BookingContext);

    return (
        <>
            {status ? (
                <BookedSeatBut disabled>
                    <BookedSeat src={seatAvailable} />
                </BookedSeatBut>
            ) : (
                <SeatButton
                    onClick={(e) =>
                        updatingBookingInfo({
                            seat,
                            rowIndex,
                            seatIndex,
                            seatId,
                        })
                    }
                >
                    <Tippy content={<span>{price}$</span>}>
                        <img
                            src={seatAvailable}
                            alt="A list of all the seats"
                        />
                    </Tippy>
                </SeatButton>
            )}
        </>
    );
};

const BookedSeat = styled.img`
    filter: grayscale(100%);
`;
const SeatButton = styled.button`
    border: 0px;
    &:hover {
        cursor: pointer;
    }
`;

const BookedSeatBut = styled.button`
    border: 0px;
`;
