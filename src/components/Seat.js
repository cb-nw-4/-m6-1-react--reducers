import React, { useState } from "react";
import styled from "styled-components";
import SeatImg from "../assets/seat-available.svg";
import { SeatContext } from "./SeatContext";

import { BookingContext } from "./BookingContext";

import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const Seat = ({ seatId }) => {
  const {
    actions: { beginBookingProcess },
  } = React.useContext(BookingContext);
  const {
    state: { seats },
    actions: {},
  } = React.useContext(SeatContext);
  return (
    <>
      {seats[`${seatId}`][`isBooked`] ? (
        <>
          <ImgGray src={SeatImg} alt={{ seatId }} />
        </>
      ) : (
        <>
          <Tippy
            content={
              "Seat: " + seatId + " Price: " + seats[`${seatId}`][`price`]
            }
          >
            <Button
              onClick={() =>
                beginBookingProcess(seatId, seats[`${seatId}`][`price`])
              }
            >
              {" "}
              <ImgReg src={SeatImg} alt={{ seatId }} />
            </Button>
          </Tippy>
        </>
      )}
    </>
  );
};

const ImgReg = styled.img`
  background: #222;
  height: 48px;
  width: 48px;
`;

const ImgGray = styled.img`
  filter: grayscale(100%);
  background: #222;
  height: 48px;
  width: 48px;
`;

const Button = styled.button`
  
  padding: 0px;
  background: #222;
  border: none;
  :hover,
  :focus {
    background: #0053ba;
  }

  :focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  }
  }
`;

export default Seat;
