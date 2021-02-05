import React from 'react';

import GlobalStyles from './GlobalStyles';
import TicketWidget from './TicketWidget';
import { SeatContext } from './SeatContext';

function App() {
  const {
    state: { numOfRows, seatsPerRow, seats },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch('/api/seat-availability')
    .then(res => res.json())
    .then(data => receiveSeatInfoFromServer(data))
  }, [])


  return (
    <>
      <GlobalStyles />
      This venue has {numOfRows} rows!
      This venue has {seatsPerRow} seats per row!
      <TicketWidget />
    </>
  );
}

export default App;
