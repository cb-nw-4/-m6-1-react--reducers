import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { Seat } from "./Seat";

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, seats },
  } = useContext(SeatContext);

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (numOfRows) {
      setHasLoaded(true);
    }
  }, [numOfRows]);

  if (!hasLoaded) {
    return <CircularProgress />;
  }

  console.log(seats)

  return (
    <Wrapper>
      {range(numOfRows).map((rowIndex) => {
        const rowName = getRowName(rowIndex);

        return (
          <Seat key={rowName}
            rowIndex={rowIndex}
            rowName={rowName}
            seatsPerRow={seatsPerRow}
            getSeatNum={getSeatNum}
            seats={seats}
          ></Seat>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default TicketWidget;
