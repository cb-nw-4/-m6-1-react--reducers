import React, {useContext} from "react";
import styled, { css } from "styled-components";
import { range } from "../utils";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import seatAvailable from "../assets/seat-available.svg";
import {BookingContext} from './BookingContext'

export const Seat = ({ rowIndex, rowName, seatsPerRow, getSeatNum, seats }) => {

  const {
    state: {status},
    actions: { beginBookingProcess },
  } = useContext(BookingContext)

  return (
    <InnerWrapper key={rowIndex}>
      <RowLabel>Row {rowName}</RowLabel>
      <Row>
        {range(seatsPerRow).map((seatIndex) => {
          const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
          const seatInfo = seats[seatId];
          
          return (
            <Tippy
              key={seatIndex}
              interactive={true}
              content={`Row ${rowName} - Seat ${seatIndex} - $${seatInfo.price}`}
            >
              <ImageButton
              disabled={seatInfo.isBooked ? true : false}
              onClick={() => {
                beginBookingProcess({status:'start', selectedSeatId: `${rowName}-${seatIndex}`, price: seatInfo.price })
              }}
              >
                <SeatWrapper key={seatId}>
                  <ImageHolder src={seatAvailable} booked={seatInfo.isBooked} />
                </SeatWrapper>
              </ImageButton>
            </Tippy>
          );
        })}
      </Row>
    </InnerWrapper>
  );
};

const ImageButton = styled.button`
  background-color: none;
  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

const ImageHolder = styled.img`
  ${({ booked }) =>
    booked &&
    css`
      filter: grayscale(100%);
    `}
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  position: relative;
`;

const RowLabel = styled.div`
  font-weight: bold;
  align-self: center;
  position: absolute;
  left: -10%;
  color: white;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;
