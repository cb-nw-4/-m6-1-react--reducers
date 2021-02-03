import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {BookingContext} from "./BookingContext";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const PurchaseModal = () =>{
  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  const updateCreditCart = (ev)=>{
    setCreditCard(ev.target.value);
  };

  const updateExpiration = (ev)=>{
    setExpiration(ev.target.value);
  };

  const { 
    state: { selectedSeatId,price },
    actions: {clearSelection, purchaseRequest, purchaseFailed, purchaseSuccess},
  } = useContext(BookingContext);

  const contentStyle = {color: 'black'};
  const tableStyle = {color: 'black'};
  const tableContainerStyle = {margin: 'auto'};
  const paymentStyle = {
    width: '100%'
   };
  const inputsStyle={ margin: '15px 15px' };
  const inputStyling={
     marginRight:'10px'
    };
  const buttonStyle={
    color: 'white', 
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: "16px 15px"};


  const tryPurchase = ()=>{
    //Await response
    purchaseRequest();

    // FETCH
    if(creditCard&&expiration){
      fetch("/api/book-seat",{
        method:"POST",
        body: JSON.stringify({
          "seatId": selectedSeatId,
          "creditCard": creditCard,
          "expiration": expiration
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"}
      })
      .then((res)=>res.json())
      .then((res)=>{
        console.log("Success",res);
        if(res.success){
          console.log("double success");
          purchaseSuccess();
        }else{
          purchaseFailed("Server error. Please retry again.");
        }
      })
      // Server error
      .catch((err)=>{
        console.log(err);
        purchaseFailed("Server error. Please retry again.");
      })
    }else{
      //Credit card error
      console.log("Please provide credit card information!");
      purchaseFailed("Please provide credit card information!");
    }
  };

    return (
    <>
    <Dialog 
    open={selectedSeatId !== null} 
    onClose={()=>{
      clearSelection();
      setCreditCard('');
      setExpiration('');}}>
    <DialogTitle id="form-dialog-title">Purchase ticket</DialogTitle>
    <DialogContent>
          <DialogContentText style={contentStyle}>
            You are purchasing 1 ticket for the price of ${price}.
          </DialogContentText>
    </DialogContent>
    <DialogContent style={tableContainerStyle}>
    <Table  style={tableStyle}>
            <TableHead>
              <TableRow>
                <TableCell>Row</TableCell>
                <TableCell>Seat</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{selectedSeatId?selectedSeatId.charAt(0):null}</TableCell>
                <TableCell>{selectedSeatId?selectedSeatId.substring(2,4):null}</TableCell>
                <TableCell>${price}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
    </DialogContent>
    <DialogTitle style={paymentStyle}>
        Enter payment details
      </DialogTitle>
    <DialogActions style={inputsStyle}>
      <form>
    <TextField
            id="credit" style={inputStyling} required
            placeholder="Credit Card" label="Credit Card"
            type="number" variant="outlined"
            onChange={(ev)=>updateCreditCart(ev)}
            value={creditCard}
          />
          <TextField
            id="exp" style={inputStyling} required
            placeholder="Expiration" label="Expiration"
            type="number" variant="outlined"
            onChange={(ev)=>updateExpiration(ev)}
            value={expiration}
          />
          <Button 
          style={buttonStyle} 
          type="submit" 
          onClick={(ev)=>{
            ev.preventDefault();
            tryPurchase();
            }}>
            PURCHASE
          </Button>
          </form>
        </DialogActions>
    </Dialog>
    </>
    );

};

export default PurchaseModal;