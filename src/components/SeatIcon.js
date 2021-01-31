import React, { useState, useContext } from "react";
import { BookingContext } from "./BookingContext";
import styled from "styled-components";
import seat from "../assets/seat-available.svg";
import Tippy, { useSingleton } from "@tippy.js/react";
// disabled={status === "unavailable" ? true : false}
const SeatIcon = ({ status, rowName, seatIndex, price }) => {
  const {
    actions: { beginBookingProcess },
  } = useContext(BookingContext);

  const seatInfo = {
    seatId: {
      row: rowName,
      seat: seatIndex,
    },
    price: price,
  };
  const handleClickSeat = (data) => {
    beginBookingProcess(data);
  };

  return (
    <div>
      <SeatButton
        disabled={status === "unavailable" && true}
        onClick={() => handleClickSeat(seatInfo)}
      >
        <Image
          alt="seat-icon"
          src={seat}
          style={{
            filter: status === "unavailable" ? "grayscale(100%)" : "none",
          }}
        />
      </SeatButton>
    </div>
  );
};

const Image = styled.img``;

const SeatButton = styled.button`
  border: none;
`;
export default SeatIcon;
