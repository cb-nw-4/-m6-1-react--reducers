import React from 'react';
import { SeatContext } from "./SeatContext";
import GlobalStyles from './GlobalStyles';

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
      TODO: write code
    </>
  );
}

export default App;
