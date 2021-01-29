import React from 'react';

import GlobalStyles from './GlobalStyles';
import { SeatContext } from './SeatContext';
import TicketWidget from './TicketWidget';

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then(res => res.json())
      .then(data => receiveSeatInfoFromServer({...data, hasLoaded: true}))
  }, []);

  return (
    <>
      <GlobalStyles />
      <TicketWidget 
      />
      {/* This venue has {numOfRows} rows and {seatsPerRow} seats per row! */}
    </>
  );
}

export default App;
