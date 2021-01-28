import React from 'react';
import styled from 'styled-components';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { SeatContext } from './SeatContext';
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import SeatSvg from '../assets/seat-available.svg'

const TicketWidget = () => {
  // TODO: use values from Context
  const {
    state,
    state: { numOfRows, seatsPerRow },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);
  console.log(state);

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              console.log(seatId);
              return (
                <SeatWrapper key={seatId}>
                  <Seat src={SeatSvg}/>
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

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

const Seat=styled.img``;

export default TicketWidget;
