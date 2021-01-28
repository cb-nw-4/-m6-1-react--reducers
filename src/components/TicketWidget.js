import React, {useContext} from 'react';
import styled from 'styled-components';
import { SeatContext } from './SeatContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import seatAvailable from "../assets/seat-available.svg";
import Tooltip from '@material-ui/core/Tooltip';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';

const TicketWidget = () => {
  // TODO: use values from Context
  // const numOfRows = 6;
  // const seatsPerRow = 6;

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats},
  } = useContext(SeatContext);


  return (
    <Div>
    
    {!hasLoaded && <CircularProgress />}

    { hasLoaded && 
      <Wrapper>
        {range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map(seatIndex => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const isAvailable = ! seats[seatId].isBooked
                console.log(seats[seatId])
                const infoSeat = `Row ${rowName}, Seat ${seatIndex} - $${seats[seatId].price}`
                
                return (
      
                  <SeatWrapper key={seatId}>
                    {/* TODO: Render the actual <Seat /> */}
                    <Tooltip title={infoSeat} placement="top">
                      <Seat src={seatAvailable} className={`tooltip ${isAvailable ? '' : 'active'}`}/>
                    </Tooltip>

                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })}
      </Wrapper>
    }

    </Div>
  );
};

const Div = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 50px 20px;

`
const Wrapper = styled.div`
  //background: #eee;
  //border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  /* &:not(:first-of-type) {
    border-bottom: 1px solid #ddd;
  }  */
`;

const RowLabel = styled.div`
  font-weight: bold;
  align-self: center;
  margin-right: 20px
`;

const SeatWrapper = styled.div`
  padding: 5px;
  background: #eee;
  border-bottom: 1px solid #ccc;

}
`;

const Seat = styled.img`
  margin : 5px;

  &.active{
    filter: grayscale(100%);
  }


`

export default TicketWidget;
