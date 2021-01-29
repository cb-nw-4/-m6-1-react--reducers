import React, { useContext } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SeatContext } from "./SeatContext";
import seatAvailable from "../assets/seat-available.svg";

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';

import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const TicketWidget = () => {
  // TODO: use values from Context 
  const {
    state: { 
      numOfRows,
      seatsPerRow,
      hasLoaded,
      seats,
     },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);


  if (!hasLoaded) {
    return (
    <Container>
      <CircularProgress />
    </Container>
    )
  }

  return (
    <Container>
    <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;


              return (
                <Tippy content={<span>Row {rowName}, Seat {seatIndex} – ${seats[seatId].price}</span>}>
                  <SeatWrapper key={seatId}>
                    {seats[seatId].isBooked === false ?
                    <img alt="available seat" src={seatAvailable} /> : 
                    <img alt="available seat" src={seatAvailable}  style={{filter: "grayscale(100%)"}} />
                    }
                  </SeatWrapper>
                </Tippy>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
    </Container>
  );
};

const Container = styled.div` 
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vw;
`;

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  width: 80px;
  color: black;
  padding-right: 10px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
