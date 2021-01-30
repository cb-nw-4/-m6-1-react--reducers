import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";

import { BookingContext } from "./BookingContext";

const PurchaseModal = () => {
  const classes = useStyles();
  const {
    creditCard,
    setCreditCard,
    expiration,
    setExpiration,
    state: { selectedSeatId, price },
    actions: { cancelBookingProcess, purchaseTicketRequest },
  } = React.useContext(BookingContext);

  return (
    <Dialog maxWidth="md" open={price !== null} onClose={cancelBookingProcess}>
      <DialogTitle id="Booking Confirmation">Booking Confirmation</DialogTitle>
      <List>
        <ListItem> You selection:</ListItem>
        <ListItem>Seat: {selectedSeatId}</ListItem>
        <ListItem>For: {price + "$"}</ListItem>
      </List>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            required
            label="Credit Card"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
            id="standard-required"
          />
          <TextField
            required
            label="Expiration xx/yy"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            id="standard-required"
          />
        </div>
        <Button onClick={purchaseTicketRequest}>Reserve it!</Button>
      </form>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default PurchaseModal;
