import React, { useContext } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import { SeatContext } from './SeatContext';
import { BookingContext } from './BookingContext';
import Seat from './Seat';
import PurchaseModal from './PurchaseModal';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TicketWidget = () => {
  const { state } = useContext(SeatContext);
  const { 
    status, 
    price,
    actions: {
      dismissPurchase
    }
  } = useContext(BookingContext);
  
  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;
  const isLoaded = state.hasLoaded;
  const seats = state.seats;

  return (
    <>
    {!isLoaded &&
      <LoadingIconWrapper>
        <CircularProgress />
      </LoadingIconWrapper>
    }
    {isLoaded &&
      <Wrapper>
        {range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {
                range(seatsPerRow).map(seatIndex => {
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

                  return (
                      <SeatWrapper key={seatId}>
                        <Seat 
                          rowName={rowName}
                          seatIndex={seatIndex}
                          price={seats[seatId] && seats[seatId].price}
                          isBooked={seats[seatId] && seats[seatId].isBooked}
                        />
                      </SeatWrapper>
                  );
                })
              }
            </Row>
          );
        })}
        <PurchaseModal 
          price={price}
        />
        <Snackbar 
          open={status === 'purchased'} 
          autoHideDuration={6000}  
          onClose={dismissPurchase}
        >
          <Alert onClose={dismissPurchase} severity="success">
              Successfully purchased ticket! Enjoy the show.
          </Alert>
        </Snackbar>
      </Wrapper>
    }
    </>
  );
};

const LoadingIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: 200px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;
`;

const RowLabel = styled.div`
  font-weight: bold;
  width: 50px;
  margin-right: 30px;
  position: relative;
  top: 20px;
`;

const SeatWrapper = styled.div`
  background: #eee;
  padding: 5px;
  border-bottom: 1px solid #ddd;
`;

export default TicketWidget;
