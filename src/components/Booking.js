import React from "react";
import styled from "styled-components";

const Booking = () => {
  return (
    <Wrapper>
      <Main>
        <Title> Purchase Ticket </Title>
        <Description>
          `You're purchasing X ticket for the price of Y`
        </Description>
      </Main>
      <Table>
        <tr>
          <SeatTable>Row</SeatTable>
          <SeatTable>Seat</SeatTable>
          <SeatTable>Price</SeatTable>
        </tr>
        <tr>
          <SeatTable></SeatTable>
          <SeatTable></SeatTable>
          <SeatTable></SeatTable>
        </tr>
      </Table>
      <PaymentInfo>
        <Info>Enter payment details</Info>
        <div>
          <CreditCard type="text" placeholder="Credit card" />
          <Expiration type="text" placeholder="Expiration" />
          <Submit />
        </div>
      </PaymentInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  background-color: white;
`;

const Main = styled.div``;

const Table = styled.table``;
const PaymentInfo = styled.div``;

const Title = styled.h2``;
const Description = styled.p``;

const SeatTable = styled.th``;

const Info = styled.h4``;
const CreditCard = styled.inpuit``;
const Expiration = styled.input``;
const Submit = styled.button``;
export default Booking;
