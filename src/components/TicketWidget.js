import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import Snackbar from "@material-ui/core/Snackbar";

import MuiAlert from "@material-ui/lab/Alert";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

import { SeatContext } from "./SeatContext";
import Seat from "./Seat";
import PurchaseModal from "./PurchaseModal";

import { BookingContext } from "./BookingContext";

const TicketWidget = ({ numOfRows, seatsPerRow }) => {
  const {
    state: { hasLoaded },
    actions: { markSeatAsPurchased },
  } = React.useContext(SeatContext);
  const {
    state: { status, selectedSeatId },
    actions: { resetBookingProcess },
  } = React.useContext(BookingContext);
  const vertical = "top";
  const horizontal = "center";

  return (
    <Wrapper>
      {hasLoaded ? (
        <>
          {range(numOfRows).map((rowIndex) => {
            const rowName = getRowName(rowIndex);

            return (
              <Row key={rowIndex}>
                <RowLabel>Row {rowName}</RowLabel>
                {range(seatsPerRow).map((seatIndex) => {
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

                  return (
                    <SeatWrapper key={seatId}>
                      <Seat seatId={seatId} />
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
        </>
      ) : (
        <CircularProgress />
      )}
      <PurchaseModal />

      <Snackbar
        open={status === "purchased"}
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={() => {
            console.log(`onClose`, selectedSeatId);
            markSeatAsPurchased(selectedSeatId);
            resetBookingProcess();
          }}
        >
          Ticket Purchased!
        </MuiAlert>
      </Snackbar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #222;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
