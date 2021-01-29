import React, { useContext } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { BookingContext } from './BookingContext';

const PurchaseModal = () => {
  const {
    state: { selectedSeatId },
    actions: { cancelBookingProcess }
  } = useContext(BookingContext);

  return (
    <Dialog overlaystyle={{backgroundColor: 'transparent'}} open={selectedSeatId !== null} onClose={cancelBookingProcess}>
      <DialogTitle >Purchase Ticket</DialogTitle>
    </Dialog>
  );
};

export default PurchaseModal;
