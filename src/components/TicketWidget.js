import React, { useContext } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';

import { ReactComponent as Seat } from "../assets/seat-available.svg";
import {SeatContext} from "./SeatContext";

const TicketWidget = () => {
  // TODO: use values from Context
  //const numOfRows = 6;
  //const seatsPerRow = 6;
  const {
    state: { hasLoaded, numOfRows, seatsPerRow },
  } = useContext(SeatContext);


  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  switch(hasLoaded){
    case false:
      return <CircularProgress />;

    case true:
      return (
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
                      <Seat/>
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
        </Wrapper>
      );

    default:
        return <CircularProgress />;
  } //end switch

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

export default TicketWidget;
