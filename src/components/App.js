import React, { useEffect } from 'react';
import { SeatContext } from './SeatContext';
import GlobalStyles from './GlobalStyles';

const App=()=>{
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(()=>{
    fetch('/api/seat-availability')
    .then(res=>res.json())
    .then(data=>receiveSeatInfoFromServer(data))
  },[])

  return (
    <>
      <GlobalStyles />
      TODO: write code
      {numOfRows}
    </>
  );
};

export default App;
