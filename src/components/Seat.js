import React, { useContext } from 'react';
import styled from 'styled-components';

import { ReactComponent as SeatImg } from '../assets/seat-available.svg';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import { BookingContext } from './BookingContext';
import PurchaseModal from './PurchaseModal';

const Seat = ({ seatId, rowName, seatIndex, price, status }) => {
  const {
    actions: { beginBookingProcess }
  } = useContext(BookingContext);

  return (
    <>
    <Tippy content={'Row ' + rowName + ', Seat ' + (seatIndex + 1) + ' - $' + price}>
      <Button onClick={() => beginBookingProcess({ selectedSeatId: seatId, price: price })} disabled={status === 'unavailable' ? true : false}>
        <SeatStyled status={status}/>
      </Button>
    </Tippy>
    <PurchaseModal />
    </>
  );
};

const SeatStyled = styled(SeatImg)`
  filter: ${props => props.status === 'unavailable' ? 'grayscale(100%)' : null};
`;

const Button = styled.button`
  /* border: none; */
`;

export default Seat;
