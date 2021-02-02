import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SeatContext } from "./SeatContext";
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import Seat from "./Seat";

const TicketWidget = () => {
  const { state: { hasLoaded, numOfRows, seatsPerRow, seats } } = React.useContext(SeatContext); 

  return (
    <>
      {!hasLoaded ? <Loader><CircularProgress /></Loader> : (
        <Wrapper>
        {range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);
          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map(seatIndex => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                //console.log(seatId)
                const seat = seats[seatId];
                return (
                  <SeatWrapper key={seatId}>
                    <Seat
                      rowIndex={rowName}
                      seatId={seatId}
                      seatIndex={getSeatNum(seatIndex)}
                      width={36}
                      height={36}
                      price={seat.price}
                      seatStatus={seat.isBooked}
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
  );
};

const Loader = styled.div`
  margin: 175px 50%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;
`;

const RowLabel = styled.div`
  display: flex;
  align-items: center;
  width: 55px;
  margin-right: 15px;
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 7px;
  background: #eee;
  border-bottom: 1px solid #ddd;
`;

export default TicketWidget;
