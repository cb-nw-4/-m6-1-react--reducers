import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SeatContext } from './SeatContext';
import GlobalStyles from './GlobalStyles';
import TicketWidget from './TicketWidget';

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
    <Wrapper>
      <GlobalStyles />
      <TicketWidget />
    </Wrapper>
  );
};

const Wrapper=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align:middle;
  height:100vh;
`;

export default App;
