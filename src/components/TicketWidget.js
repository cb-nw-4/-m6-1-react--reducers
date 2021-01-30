import React, { useContext } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SeatContext } from './SeatContext';
import  Seat from './Seat';
import PurchaseModal from './PurchaseModal';
import SnackBar from './SnackBar';
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';


const TicketWidget = () => {   
  const {
    state: { hasLoaded, numOfRows, seatsPerRow, seats }  
 } = useContext(SeatContext);   

  return (
    <MainWrapper>   
      {!hasLoaded ? <CircularProgress /> : <>
      <Wrapper>
        {range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);

          return (  
            <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map(seatIndex => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const seat = seats[seatId];             
                return (
                  <Seat
                    key={seatId}
                    rowName={rowName}                   
                    seatIndex={seatIndex}                   
                    price={seat.price}
                    status={seat.isBooked ? "unavailable" : "available"}
                  />                  
                );
              })}
            </Row>          
          );
        })}
      </Wrapper>
       <PurchaseModal />
       <SnackBar />
       </>       
      }
     
    </MainWrapper>
  );
};

const Wrapper = styled.div`
  display: inline-block;
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

export default TicketWidget;
