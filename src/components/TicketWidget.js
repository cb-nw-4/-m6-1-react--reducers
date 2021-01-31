import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import SeatIcon from "./SeatIcon";
import Loading from "./Loading";
import { Progress } from "@material-ui/core";
import Tippy from "@tippy.js/react";
const TicketWidget = () => {
  const {
    actions: { receiveSeatInfoFromServer },
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
  } = useContext(SeatContext);

  return !hasLoaded ? (
    <Loading />
  ) : (
    <Wrapper>
      {range(numOfRows).map((rowIndex) => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            <RowSeatsIcon key={rowIndex}>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const seatInfo = seats[seatId];

                return (
                  <TippyInfo
                    interactive={true}
                    delay={[200, 10]}
                    content={`Row ${rowName} - Seat ${seatIndex} - $${seatInfo.price}`}
                  >
                    <SeatWrapper key={seatId}>
                      <SeatIcon
                        rowIndex={rowIndex}
                        seatIndex={seatIndex}
                        width={30}
                        height={30}
                        price={seatInfo.price}
                        status={seatInfo.isBooked ? "unavailable" : "available"}
                      />
                    </SeatWrapper>
                  </TippyInfo>
                );
              })}
            </RowSeatsIcon>
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 3px;
  padding: 8px;
  margin-left: 20px;
`;

const Row = styled.div`
  display: flex;
  position: relative;
`;
const RowLabel = styled.div`
  font-weight: bold;
  margin-right: 20px;
`;
const RowSeatsIcon = styled.div`
  background-color: #eee;
  display: flex;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const TippyInfo = styled(Tippy)`
  background-color: lightslategray;
  color: white;
`;
const SeatWrapper = styled.div`
  padding: 10px;
`;

export default TicketWidget;
