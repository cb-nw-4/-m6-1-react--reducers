import { Dialog, TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import styled from "styled-components";
// import CloseIcon from "@material-ui/icons/Close";

import { BookingContext } from "./BookingContext";
import { SeatContext } from "./SeatContext";

const PurchaseModal = () => {
  const {
    state: { status, error, selectedSeatId, price },
    actions: {
      CancelBookingProcess,
      PurchaseTicketRequest,
      PurchaseTicketFailure,
      PurchaseTicketSuccess,
    },
  } = React.useContext(BookingContext);

  const {
    state: { seats },
    actions: { MarkSeatAsPurchased },
  } = React.useContext(SeatContext);

  const seatId = selectedSeatId;
  const seatRow = selectedSeatId.slice(0, 1);
  const seatNo = selectedSeatId.slice(2, 3);

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  const handleClick = (ev) => {
    ev.preventDefault();
    PurchaseTicketRequest();

    const postObject = {
      seatId: seatId,
      creditCard: creditCard,
      expiration: expiration,
    };

    fetch("/api/book-seat", {
      method: "POST",
      body: JSON.stringify(postObject),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 200) {
          PurchaseTicketFailure(json);
        } else {
          PurchaseTicketSuccess();
          MarkSeatAsPurchased({ seats, seatId, price });
        }
      });
  };

  return (
    <Dialog open={selectedSeatId !== null}>
      <CloseButton onClick={CancelBookingProcess}>
        {/* <CloseIcon /> */}
      </CloseButton>
      <ModalBox>
        <Title>Purchase Ticket</Title>
        <Info>
          You're purchasing <strong>1</strong> ticket for the price of ${price}
        </Info>
        <Table>
          <Row>
            <TableHeader>Row</TableHeader>
            <TableHeader>Seat</TableHeader>
            <TableHeader>Price</TableHeader>
          </Row>
          <Row>
            <TableData>{seatRow}</TableData>
            <TableData>{seatNo}</TableData>
            <TableData>${price}</TableData>
          </Row>
        </Table>
        <GrayArea>
          <FormTitle>Enter payment details</FormTitle>
          <Form>
            <TextField
              label="Credit card"
              variant="outlined"
              style={{ marginRight: "10px", flex: "2" }}
              value={creditCard}
              onChange={(ev) => {
                setCreditCard(ev.target.value);
              }}
            />
            <TextField
              label="Expiration date"
              variant="outlined"
              style={{ marginRight: "10px", flex: "1" }}
              value={expiration}
              onChange={(ev) => {
                setExpiration(ev.target.value);
              }}
            />
            <Button onClick={handleClick}>
              {status === "awaiting-response" ? (
                <CircularProgress size="30px" style={{ color: "white" }} />
              ) : (
                `PURCHASE`
              )}
            </Button>
          </Form>
          {error ? <Error>{error}</Error> : <Error />}
        </GrayArea>
      </ModalBox>
    </Dialog>
  );
};

const CloseButton = styled.button`
  outline: none;
  border: none;
  display: flex;
  justify-content: flex-end;
  background-color: white;
`;

const ModalBox = styled.div`
  min-width: 45%;
  background-color: white;
  color: black;
  z-index: 5;
  padding: 10px 0px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bolder;
  padding: 10px 40px;
`;

const Info = styled.div`
  font-size: 18px;
  padding: 10px 40px;
`;

const Table = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  padding: 10px 40px;
`;

const Row = styled.div`
  padding: 15px 5px;
  display: flex;
  border-bottom: 1px solid #ccd0db;
`;

const TableHeader = styled.div`
  flex: 1;
  font-weight: bolder;
  display: flex;
`;

const TableData = styled.div`
  flex: 1;
  display: flex;
`;

const GrayArea = styled.div`
  width: 100%;
  font-size: 18px;
  background-color: #f3f3f3;
  margin: 20px 0px;
  padding: 20px 40px;
`;

const Form = styled.form`
  display: flex;
  font-size: 18px;
`;

const FormTitle = styled.div`
  padding: 10px 0px;
`;

const Button = styled.button`
  border: 1px solid #4f56a4;
  background-color: #4f56a4;
  color: white;
  padding: 10px;
  border-radius: 10px;
  flex: 0.5;
  &:active {
    transform: scale(0.8);
  }
  &:focus {
    outline: none;
  }
`;

const Error = styled.div`
  padding: 10px 0px;
  color: red;
`;

export default PurchaseModal;
