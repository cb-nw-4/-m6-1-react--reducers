import React, {useContext, useEffect} from 'react';
import { BookingContext } from './BookingContext';

import GlobalStyles from './GlobalStyles';
import PurchaseModel from './PurchaseModal';
import { SeatContext } from './SeatContext';
import TicketWidget from './TicketWidget'

function App() {

  const {
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);



  useEffect(() => {
    fetch('/api/seat-availability')
      .then(res =>{
        //console.log('res', res)
        return res.json()
      } )
      .then(data => receiveSeatInfoFromServer(data));
  }, []);



  return (
    <>
      <GlobalStyles />
      <TicketWidget /> 
      <PurchaseModel />

    </>
  );
}

export default App;
