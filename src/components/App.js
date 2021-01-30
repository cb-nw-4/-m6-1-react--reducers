import React, { useContext, useEffect } from "react";
import { SeatContext } from "./SeatContext";
import GlobalStyles from "./GlobalStyles";
import TicketWidget from "./TicketWidget";
import styled from "styled-components";

function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);

  useEffect(() => {
    const getSeatAvailability = async () => {
      const seatAvailabilityHeaders = await fetch("/api/seat-availability");
      const seatAvailabilityBody = await seatAvailabilityHeaders.json();
      receiveSeatInfoFromServer(seatAvailabilityBody);
    };
    getSeatAvailability();
  }, []);

  return (
    <>
      <Wrapper>
        <GlobalStyles />
        <TicketWidget></TicketWidget>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default App;
