import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SeatContext } from './SeatContext';
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import Seat from './Seat';


const TicketWidget = () => {
  // TODO: use values from Context
  const {
    state,
    state: { numOfRows, seatsPerRow, seats },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);
  console.log(state);

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <>
    {state.hasLoaded ? <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              return (
                <SeatWrapper key={seatId}>
                  <Seat id={seatId}
                        rowName={rowName}
                        seatNumber={getSeatNum(seatIndex)}
                        status={seats[seatId].isBooked ? "unavailable" : "available"}
                        price={seats[seatId].price}
                  />
                  {console.log(rowName, getSeatNum(seatIndex))}
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper> : <CircularProgress />}
    </>
  );
};

const Wrapper = styled.div`
  /* border: 1px solid #ccc; */
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  /* &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  } */
`;

const RowLabel = styled.div`
  margin-right:10px;
  margin-top:20px;
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  background: #eee;
  padding: 10px;
`;


export default TicketWidget;
