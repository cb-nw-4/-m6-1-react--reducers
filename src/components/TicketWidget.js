import React, { useContext } from 'react';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SeatContext } from './SeatContext';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import seat from "../assets/seat-available.svg";

const TicketWidget = () => {  
  // TODO: use values from Context
  const {
    state: { hasLoaded, numOfRows, seatsPerRow, seats }  
 } = useContext(SeatContext);
  

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <MainWrapper>   
      {!hasLoaded ? <CircularProgress /> : 
      <Wrapper>
        {range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);

          return (  
            <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map(seatIndex => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const isBooked = seats[seatId].isBooked;
                return (
                  <SeatWrapper key={seatId} isBooked={isBooked}>
                    <Tippy content={`Row ${rowName}, Seat ${getSeatNum(seatIndex)} - $ ${seats[seatId].price}`} enabled={!isBooked}>
                      <SeatButton>
                        <img src={seat} alt="seat"/>
                      </SeatButton>
                    </Tippy>
                  </SeatWrapper>
                );
              })}
            </Row>          
          );
        })}
      </Wrapper>
      }
    </MainWrapper>
  );
};
//isBooked={seats.seatId.isBooked}
const Wrapper = styled.div`
display: inline-block;
//flex-direction: column;
//width: auto;

  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  background-color: #222;
  position: absolute;
  left: -80px;
  top: 20px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
  filter: ${(p)=> (p.isBooked ? 'grayscale(100%)' : null)};
`;

const SeatButton = styled.button`
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  
 // position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;


  &:active {
    color: inherit;
  }
`;

export default TicketWidget;
