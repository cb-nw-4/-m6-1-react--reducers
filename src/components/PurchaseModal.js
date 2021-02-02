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

const PurchaseModal = () =>{
    const { 
        state: { selectedSeatId },
        actions: {clearSelection},
      } = useContext(BookingContext);

    useEffect(()=>{
        const handleKeyDown = (event)=>{
            console.log('some key presses');
            if(event.key==='Enter'){
                clearSelection();
                console.log("enter pressed")
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        
        return ()=> {
            window.removeEventListener("keydown", handleKeyDown)};
    },[]);

    return (
    <>
    <Dialog open={selectedSeatId !== null} >
    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
    <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
    </DialogContent>
    <DialogActions>
          <Button  color="primary">
            Cancel
          </Button>
          <Button  color="primary">
            Subscribe
          </Button>
        </DialogActions>


    </Dialog>
    </>
    );

};

export default PurchaseModal;