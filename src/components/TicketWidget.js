import React, { useContext } from 'react';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import { SeatContext } from '../components/SeatContext';
import { ReactComponent as Seat } from '../assets/seat-available.svg';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, seats, hasLoaded }
  } = useContext(SeatContext);

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

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

                return (
                  <SeatWrapper key={seatId}>
                    <Tippy content={'Row ' + rowName + ', Seat ' + (seatIndex + 1) + ' - $' + seats[seatId].price}>
                    {seats[seatId].isBooked ? 
                      <SeatStyled grayscale="true" />
                    :
                      <SeatStyled grayscale="false" />
                    }
                    </Tippy>
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })}
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

const RowContainer = styled.div`
  width: 500px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
  border-bottom: 1px solid #ddd;
`;

const SeatStyled = styled(Seat)`
  filter: ${props => props.grayscale === 'true' ? 'grayscale(100%)' : null};
`;


export default TicketWidget;
