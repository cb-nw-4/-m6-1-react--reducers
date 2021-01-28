import React, { useContext, useEffect } from 'react';

import GlobalStyles from './GlobalStyles';
import { SeatContext } from './SeatContext';
import TicketWidit from './TicketWidget';

const App = () => {
  const {
    actions: { receiveSeatInfoFromServer }
  } = useContext(SeatContext);

  useEffect(() => {
    fetch('/api/seat-availability')
      .then(res => res.json())
      .then(data => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <TicketWidit />
    </>
  );
};

export default App;
