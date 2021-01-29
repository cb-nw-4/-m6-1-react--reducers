import React from 'react';
import styled from 'styled-components';

import { ReactComponent as SeatImg } from '../assets/seat-available.svg';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

const Seat = ({ rowName, rowIndex, seatIndex, price, status }) => {
  return (
    <Tippy content={'Row ' + rowName + ', Seat ' + (seatIndex + 1) + ' - $' + price}>
      <Button disabled={status === 'unavailable' ? true : false}>
        <SeatStyled status={status}/>
      </Button>
    </Tippy>
  );
};

const SeatStyled = styled(SeatImg)`
  filter: ${props => props.status === 'unavailable' ? 'grayscale(100%)' : null};
`;

const Button = styled.button`
  /* border: none; */
`;

export default Seat;
