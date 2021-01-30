import React, { useContext, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { BookingContext } from "./BookingContext";

export const PurchaseModal = () => {
  const [creditCard, setCreditCard] = useState("");
  const [expiration, setExpiration] = useState("");
  const {
    state,
    actions: {
      cancelBookingProcess,
      purchaseTicketRequest,
      purchaseTicketFailure,
      purchaseTicketSuccess,
    },
  } = useContext(BookingContext);

  const handleClick = (ev) => {
    ev.preventDefault();
    purchaseTicketRequest();

    fetch("/api/book-seat", {
      method: "POST",
      body: JSON.stringify({
        seatId: state.selectedSeatId,
        creditCard: creditCard,
        expiration: expiration,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(response => response.status !== 200 ? purchaseTicketFailure() : purchaseTicketSuccess())
  };

  console.log(state.status);
  

  return (
    <Dialog
      open={state.selectedSeatId !== null}
      onClose={() => {
        cancelBookingProcess();
      }}
    >
      <Header>Purchase ticket</Header>
      <SubHeader>
        You're purchasing <b>1</b> ticket for the price of ${state.price}.
      </SubHeader>
      <TableWrapper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Row</TableCell>
                <TableCell>Seat</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {state.selectedSeatId ? state.selectedSeatId[0] : null}
                </TableCell>
                <TableCell>
                  {state.selectedSeatId ? state.selectedSeatId[2] : null}
                </TableCell>
                <TableCell>{state.price ? state.price : null}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>

      <GreyBox>
        <H2>Enter payment details</H2>
        <InputContainer>
          <TextField
            // error
            id="outlined-error"
            placeholder="Credit card"
            variant="outlined"
            onChange={(ev) => {
              setCreditCard(ev.target.value);
            }}
          ></TextField>
          <TextField
            // error
            id="outlined-error"
            placeholder="Expiration"
            variant="outlined"
            onChange={(ev) => {
              setExpiration(ev.target.value);
            }}
          ></TextField>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={(ev) => {
              handleClick(ev);
            }}
          >
            Purchase
          </Button>
        </InputContainer>
      </GreyBox>
    </Dialog>
  );
};

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 10%;
  margin-right: 10%;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-around;
`;

const GreyBox = styled.div`
  background-color: whitesmoke;
  padding: 2rem;
  width: 500px;
  margin: 2rem;
`;

const Header = styled.h1`
  font-family: sans-serif;
  font-weight: bolder;
  margin: 1rem;
`;

const H2 = styled.h2`
  font-family: sans-serif;
  font-weight: bolder;
`;

const SubHeader = styled.p`
  font-family: sans-serif;
  margin: 0rem 1rem 1rem 1rem;
`;
