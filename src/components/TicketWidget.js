import React, { useContext } from 'react';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import { SeatContext } from '../components/SeatContext';
import Seat from './Seat';
import PurchaseModal from './PurchaseModal';

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, seats, hasLoaded }
  } = useContext(SeatContext);

  return (
    <Wrapper>
      {hasLoaded ?
        <Seating>
          {range(numOfRows).map(rowIndex => {
            const rowName = getRowName(rowIndex);

            return (
              <Row key={rowIndex}>
                <RowLabel>Row {rowName}</RowLabel>
                {range(seatsPerRow).map(seatIndex => {
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                  const seat = seats[seatId];

                  return (
                    <SeatWrapper key={seatId}>
                      <Seat
                        seatId={seatId}
                        rowName={rowName}
                        seatIndex={seatIndex}
                        price={seat.price}
                        status={seat.isBooked ? 'unavailable' : 'available'}
                      />
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
          <PurchaseModal />
        </Seating>
      :
        <CircularProgress />
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Seating = styled.div`
  background: #eee;
  /* border: 1px solid #ccc; */
  border-radius: 3px;
  /* padding: 8px; */
  margin: 20px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  /* &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  } */
`;

const RowLabel = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  font-weight: bold;
  background-color: #222;
  padding-right: 20px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
  border-bottom: 1px solid #ddd;
`;

export default TicketWidget;
