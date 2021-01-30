import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import { SeatContext } from './SeatContext';
import SeatSrc from "../assets/seat-available.svg";
import Tippy from '@tippyjs/react';
import { Tooltip } from '@material-ui/core';
import 'tippy.js/dist/tippy.css';
import Seat from './Seat';

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
    // actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);
    console.log(numOfRows, seatsPerRow);
  
  

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  // const handleOnClick = () => {
  //   console.log('Clicked')
  // }

  if(!hasLoaded){
    return(
      <Loading>
        <CircularProgress />
      </Loading>
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
              console.log(seatInfo,'seatInfo');

              return (
                <SeatWrapper key={seatId}>
                  {/* {seatInfo.isBooked ? (
                    <img className="grayOut" src ={SeatSrc}/>
                  ):(
                    <Tippy
                      content={`Row ${rowName}, Seat ${seatIndex + 1} - $${seatInfo.price}`}
                    >
                      <img onClick={handleOnClick} src={SeatSrc}/>
                    </Tippy>
                  )} */}
                  <Seat 
                    rowIndex={rowIndex}
                    seatIndex={seatIndex}
                    width={36}
                    height={36}
                    price={seatInfo.price}
                    status={seatInfo.isBooked ? true:false}
                    rowName={rowName}
                  />
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Loading = styled.div`
  margin: 260px auto;
  width: 50px;
`;
const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  width: 830px;
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
  p{
    color: black;
    position: absolute;
  }
`;

export default TicketWidget;
