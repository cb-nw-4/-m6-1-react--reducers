import React, { useContext } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SeatContext } from './SeatContext';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import seat from "../assets/seat-available.svg";

const TicketWidget = () => {  
  // TODO: use values from Context
  const {
    state: { numOfRows, seatsPerRow }  
 } = useContext(SeatContext);
  

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <MainWrapper>    
    <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (  
          <Row key={rowIndex}>
          <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

              return (
                <SeatWrapper key={seatId}>
                  <img src={seat} alt="happyM<eal"/>
                </SeatWrapper>
              );
            })}
          </Row>          
        );
      })}
    </Wrapper>
    </MainWrapper>
  );
};

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
`;

export default TicketWidget;
