import React, { useContext } from 'react';
import styled from 'styled-components';

import { SeatContext } from './SeatContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import Seat from './Seat';

const TicketWidget = () => {
  const {
    state: { numOfRows, seats, seatsPerRow, hasLoaded },
  } = useContext(SeatContext);

  return (
    <>
      {!hasLoaded 
        ?
        <LoaderDiv>
          <CircularProgress />
        </LoaderDiv>
        :
        <Wrapper>
          {range(numOfRows).map(rowIndex => {
            const rowName = getRowName(rowIndex);

            return (
              <>
                <Row key={rowIndex}>
                  <RowLabel>Row {rowName}</RowLabel>
                  {range(seatsPerRow).map(seatIndex => {
                    const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                    const seat = seats[seatId];

                    return (
                      <SeatWrapper key={seatId}>
                        <Seat
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
              </>
            );
          })}
        </Wrapper>
      }
    </>
  );
};

const LoaderDiv = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  height: 100%;
`;

// const Loader = styled(CircularProgress)`
//   position: relative;
//   top: 50%;
//   left: 25%;
// `;

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  position: relative;
  left: 25%;
  top: 25px;
  width: 800px;
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
  padding: 5px;
  margin-right: 15px;
  /* width: 50px;
  height: 50px;
  background-color: black;
  color: white; */
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
