import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SeatContext } from './SeatContext';
import { BookingContext } from './BookingContext';
import seatAvailable from '../assets/seat-available.svg'
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import PurchaseModal from './PurchaseModal';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import PurchaseConfirmation from './PurchaseConfirmation';

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
  } = React.useContext(SeatContext);

  const {
    state: { status, selectedSeatId },
    actions: { BeginBookingProcess }
  } = React.useContext(BookingContext);


  return (
    <Wrapper>
    {!hasLoaded 
    ? 
      <SpinnerWrapper>
        <CircularProgress />
      </SpinnerWrapper> 
    : 
      <MainWrapper>
        {selectedSeatId && <PurchaseModal/>}
        {range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map(seatIndex => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const seat = seats[seatId];
                const seatPrice = seats[seatId]["price"];

                return (
                  <SeatWrapper key={seatId}>
                    {
                      <Tippy content={`Row ${rowName}, Seat ${seatIndex+1} - $${seatPrice}`}>
                        <Seat 
                          disabled={seat["isBooked"]}
                          onClick={()=>{BeginBookingProcess({seatId:seatId,seatPrice:seatPrice})}}
                        >
                          <SeatImg 
                            alt={seatIndex} 
                            src={seatAvailable} 
                            width={36}
                            height={36}
                            greyedOut={seat["isBooked"] ? "grayscale(100%)" : ""}
                          />
                        </Seat>
                      </Tippy>
                    }
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })}
      </MainWrapper>
    }
    {status==="purchased" && <PurchaseConfirmation/>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height:100vh; 
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction:column;
  align-items:center;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const RowLabel = styled.div`
  font-weight: bold;
  padding-right: 10px;
  width:60px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
  background: #eee;
`;

const SpinnerWrapper = styled.div`
width:100%;
height:100vh; 
display:flex;
align-items: center;
justify-content:center;
`;

const Seat = styled.button`
border:none; 
outline:none; 
padding: 2px;
&:active {
  box-shadow: 0px 0px 5px 3px #a1c4f4;
}
`;

const SeatImg = styled.img`
filter: ${({greyedOut})=> greyedOut}
`;

export default TicketWidget;
