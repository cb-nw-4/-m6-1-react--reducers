import React, { useContext } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';

import {SeatContext} from "./SeatContext";
import {BookingContext} from "./BookingContext";
import Seat from "./Seat";
import PurchaseModal from './PurchaseModal';

const TicketWidget = () => {

  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
  } = useContext(SeatContext);

  const { 
    state: { status, error, selectedSeatId, price }
  } = useContext(BookingContext);

  switch(hasLoaded){
    case false:
      return <CircularBox><CircularProgress /></CircularBox>;

    case true:
      return (
        <Box>
        <Wrapper>
          {range(numOfRows).map(rowIndex => {
            const rowName = getRowName(rowIndex);
    
            return (
              <Row key={rowIndex}>
                <RowLabel>Row {rowName}</RowLabel>
                {range(seatsPerRow).map(seatIndex => {
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                  const seat = seats[seatId];
                  const seatNum = getSeatNum(seatIndex);

                  return (
                    <SeatWrapper key={seatId}>
                      <Seat
                      rowName={rowName}
                      seatNum={seatNum}
                      seatId={seatId}
                      width={36}
                      height={36}
                      price={seat.price}
                      status={seat.isBooked ? "unavailable" : "available"}
                      />
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
        </Wrapper>
        <PurchaseModal/>

        </Box>
      );

    default:
        return <CircularBox><CircularProgress /></CircularBox>;
  } //end switch

};

const CircularBox = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  display: inline-block;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  background-color: #eee;
  align-items: center;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  background-color: transparent;
  position:absolute;
  left: -85px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
