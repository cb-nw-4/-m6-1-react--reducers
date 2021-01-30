import React, { useContext } from "react";

import GlobalStyles from "./GlobalStyles";
import TicketWidget from "../components/TicketWidget"

import { SeatContext } from "./SeatContext";

function App() {
  const {
    state: { numOfRows, seatsPerRow },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => {
        receiveSeatInfoFromServer(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <GlobalStyles />
      <TicketWidget numOfRows={numOfRows} seatsPerRow={seatsPerRow}/>
      This venue has {numOfRows} rows!
    </>
  );
}

export default App;
