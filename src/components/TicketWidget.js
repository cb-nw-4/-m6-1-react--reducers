import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import { SeatContext } from './SeatContext';
import SeatSrc from "../assets/seat-available.svg"

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
    // actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);
    console.log(numOfRows, seatsPerRow);
  
  

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  if(!hasLoaded){
    return(
      <div>LOADING</div>
    )
  }
  return (
    <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              const seatInfo = seats[seatId];
              console.log(seatInfo.isBooked, 'seatInfo');

              return (
                // <SeatWrapper key={seatId}>
                //   {seatInfo.isBooked ? (
                //     <>
                //       <SeatBooked src={SeatSrc}/>
                //       <div></div>
                //     </>
                //   ):(
                //     <Seat src={SeatSrc}/>
                //   )}
                // </SeatWrapper>
                <SeatWrapper key={seatId}>
                  <img className={seatInfo.isBooked ? "grayOut":""} src={SeatSrc}/>
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
  width: 710px;
  margin: 70px auto;
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
  position: absolute;
  left: -70px;
  top: 20px;
`;

const SeatWrapper = styled.div`
  padding: 5px;

  .grayOut{
    filter: grayscale(100%);
  }
`;

export default TicketWidget;
