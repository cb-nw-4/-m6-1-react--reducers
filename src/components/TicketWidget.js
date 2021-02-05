import React, { useContext } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import Seat from './Seat'

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import { SeatContext, SeatProvider } from './SeatContext';
import { BookingContext } from './BookingContext';

const TicketWidget = () => {
  // TODO: use values from Context
  // const numOfRows = 6;
  // const seatsPerRow = 6;

  const { state: {
    hasLoaded,
    numOfRows,
    seatsPerRow,
    seats,
  }} = useContext(SeatContext)

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  return (
    <>
          {
        !hasLoaded ? 
        <div>
          <CircularProgress color="secondary" />
        </div>
        : (
    <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              const seatNumber = getSeatNum(seatIndex);
              const seatPrice = seats[seatId]['price'];
              const seatStatus = seats[seatId]['isBooked'];
              return (
                <SeatWrapper key={seatId}>
                  {/* TODO: Render the actual <Seat /> */}
                  <Seat
                  seatPrice={seatPrice}
                  seatStatus={seatStatus}
                  rowName={rowName}
                  seatNumber={seatNumber}
                  />
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
        )}
    </>
    )}

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
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
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
