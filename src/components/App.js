import React from 'react';
import { SeatContext } from "./SeatContext";
import GlobalStyles from './GlobalStyles';
import TicketWidget from "./TicketWidget";

function App() {
  const {
    actions: { receiveSeatInfoFromServer }, 
    state
  } = React.useContext(SeatContext)

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => {
        receiveSeatInfoFromServer(data);
        //console.log(data);
      })
      .catch((error) => console.log(error))
  }, []);

  return (
    <>
      <GlobalStyles />
      <TicketWidget />
    </>
  );
}

export default App;
