import React from 'react'
import styled, {css}from 'styled-components';
import { range } from "../utils";
import Tippy from "@tippy.js/react";
import 'tippy.js/dist/tippy.css';
import seatAvailable from "../assets/seat-available.svg";


export const Seat = ({rowIndex, rowName, seatsPerRow, seatIndex, getSeatNum, seats}) => {

  return (
    <InnerWrapper key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            <Row>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const seatInfo = seats[seatId];
                
                return (
                  <Tippy key={seatIndex} interactive={true} content={`Row ${rowName} - Seat ${seatIndex} - $${seatInfo.price}`}>
                    <SeatWrapper key={seatId} onClick={() => {}}>
                      <ImageHolder
                        src={seatAvailable}
                        booked={seatInfo.isBooked}
                      />
                    </SeatWrapper>
                  </Tippy>
                );
              })}
            </Row>
          </InnerWrapper>
  )
}

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
  left: -15%;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;
