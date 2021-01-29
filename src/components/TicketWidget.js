import React, { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import seatAvailable from "../assets/seat-available.svg";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import Tippy from "@tippy.js/react";
import 'tippy.js/dist/tippy.css';
import Seat from './Seat'
const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, seats },
  } = useContext(SeatContext);

  console.log(seats);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (numOfRows) {
      setHasLoaded(true);
    }
  }, [numOfRows]);

  if (!hasLoaded) {
    return <CircularProgress />;
  }

  return (
    <Wrapper>
      {range(numOfRows).map((rowIndex) => {
        const rowName = getRowName(rowIndex);

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
        );
      })}
    </Wrapper>
  );
};



const ImageHolder = styled.img`
  ${({ booked }) =>
    booked &&
    css`
      filter: grayscale(100%);
    `}
`;

const InnerWrapper = styled.div`
  display: flex;
  position: relative;
`;

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
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

export default TicketWidget;
