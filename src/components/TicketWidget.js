import React, {useContext} from 'react';
import styled from 'styled-components';
import { SeatContext } from './SeatContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import Seat from './Seat';



import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import { BookingContext } from './BookingContext';

const TicketWidget = () => {
  // TODO: use values from Context
  // const numOfRows = 6;
  // const seatsPerRow = 6;

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats},
  } = useContext(SeatContext);

  

  return (
    <Div>
    
    {!hasLoaded && <CircularProgress />}

    { hasLoaded && 
      <Wrapper>
        {range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map(seatIndex => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const seat = seats[seatId]
                
                return (
                  <SeatWrapper key={seatId}>
                    {/* TODO: Render the actual <Seat /> */}
                    <Seat 
                      rowIndex={rowIndex}
                      rowName={rowName}
                      seatIndex={seatIndex}
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
    }

    </Div>
  );
};

const Div = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 50px 20px;

`
const Wrapper = styled.div`
  //background: #eee;
  //border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  /* &:not(:first-of-type) {
    border-bottom: 1px solid #ddd;
  }  */
`;

const RowLabel = styled.div`
  font-weight: bold;
  align-self: center;
  margin-right: 20px
`;

const SeatWrapper = styled.div`
  padding: 5px;
  background: #eee;
  border-bottom: 1px solid #ccc;

`



export default TicketWidget;
