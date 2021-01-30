import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import { BookingContext } from './BookingContext';
import { decodeSeatId } from '../helpers';

const PurchaseModal = () => {
  const {
    state: { selectedSeatId, price, error },
    actions: {
      cancelBookingProcess,
      purchaseTicketRequest
    }
  } = useContext(BookingContext);
  const {rowName, seatNum } = decodeSeatId(selectedSeatId);
  const [creditCard, setCreditCard] = useState('');
  const [expiration, setExpiration] = useState('');

  const handleCreditCardInput = (event) => {
    if ((/^\d+$/.test(event.target.value) || event.target.value === '') && event.target.value.length < 17) {
      setCreditCard(event.target.value);
    }
  };

  const handleExpirationInput = (event) => {
    if ((/^\d+$/.test(event.target.value) || event.target.value === '') && event.target.value.length < 5) {
      setExpiration(event.target.value);
    }
  };

  return (
    <Dialog
      overlaystyle={{backgroundColor: 'transparent'}}
      open={selectedSeatId !== null}
      onClose={() => {
        setCreditCard('');
        setExpiration('');
        cancelBookingProcess();
      }}
    >
      <DialogWrapper>
        <Header>Purchase ticket</Header>
        <SubHeader>You're purchasing <b>1</b> ticket for the price of ${price}.</SubHeader>
        <Details>
          <Row>
            <div>Row</div><div>Seat</div><div>Price</div>
          </Row>
          <Row>
            <div>{rowName}</div><div>{seatNum}</div><div>${price}</div>
          </Row>
        </Details>
        <PaymentDetails>
          Enter payment details
          <Form>
          <FormItemsContainer>
            <TextFieldCredit
              id="credit-card"
              label="Credit card"
              variant="outlined"
              value={creditCard}
              onChange={handleCreditCardInput}
            />
            <TextFieldExpiry
              id="expiry"
              label="Expiry"
              variant="outlined"
              value={expiration}
              onChange={handleExpirationInput}
            />
            <PurchaseButton onClick={(event) => purchaseTicketRequest(event, selectedSeatId, creditCard, expiration)}>PURCHASE</PurchaseButton>
          </FormItemsContainer>
          </Form>
          <ErrorMessage>{error}</ErrorMessage>
        </PaymentDetails>
      </DialogWrapper>
    </Dialog>
  );
};

const DialogWrapper = styled.div`
  width: 500px;
`;

const Header = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 20px;
`;

const SubHeader = styled.div`
  margin-left: 20px;
`;

const Details = styled.div`
  width: 400px;
  height: 100px;
  margin: 30px 50px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid lightgray;
`;

const PaymentDetails = styled.div`
  font-weight: bold;
  background-color: #eeeeee;
  padding: 30px 30px 20px 30px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  margin-top: 17px;
`;

const FormItemsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TextFieldCredit = styled(TextField)`
  width: 180px;
`;

const TextFieldExpiry = styled(TextField)`
  width: 70px;
`;

const PurchaseButton = styled.button`
  height: 56px;
  width: 125px;
  color: white;
  background-color: #3f51b5;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

export default PurchaseModal;
