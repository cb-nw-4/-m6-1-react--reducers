import React, {useContext, useEffect} from 'react';
import {SeatContext} from './SeatContext';
import TicketWidget from './TicketWidget';

import GlobalStyles from './GlobalStyles';

function App() {
  const { 
    state: { numOfRows },
    actions: {receiveSeatInfoFromServer},
  } = useContext(SeatContext);

  useEffect(()=>{
    fetch('/api/seat-availability')
      .then(res => res.json())
      .then(data => {
        receiveSeatInfoFromServer(data);
        console.log("Fetch seat info: ",data);})
  }, []);


  return (
    <>
      <GlobalStyles />
      This venue has {numOfRows} rows!
      <TicketWidget/>
    </>
  );
}

export default App;
