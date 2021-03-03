import React, { useContext } from "react";
import styled from "styled-components";
// import CloseIcon from "@material-ui/icons/Close";
// import CheckIcon from "@material-ui/icons/Check";
import { BookingContext } from "./BookingContext";

const PurchaseConfirmation = () => {
  const {
    actions: { CancelBookingProcess },
  } = useContext(BookingContext);

  return (
    <Wrapper>
      {/* <CheckIcon /> */}
      <ConfirmationMessage>
        Successfully purchased ticket! Enjoy the show.
      </ConfirmationMessage>
      <CloseButton onClick={CancelBookingProcess}>
        {/* <CloseIcon /> */}
      </CloseButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  background-color: #66b265;
  color: white;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 5px;
`;

const CloseButton = styled.button`
  color: white;
  padding: 0px;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  background-color: inherit;
`;

const ConfirmationMessage = styled.div`
  margin: 10px;
`;

export default PurchaseConfirmation;
