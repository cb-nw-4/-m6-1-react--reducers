import React, { useReducer } from 'react';
import TicketWidget from "./TicketWidget";

import { SeatContext } from "./SeatContext";

import GlobalStyles from './GlobalStyles';

function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch('api/seat-availability')
    .then(res => res.json())
    .then(data => receiveSeatInfoFromServer(data));
  }, []);
  
  return (
    <>
      <GlobalStyles />
      <TicketWidget />
      {/* This venue has {numOfRows} rows! */}
    </>
  );
}

export default App;
