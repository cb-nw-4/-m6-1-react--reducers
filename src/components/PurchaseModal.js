import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BookingContext } from './BookingContext';

const PurchaseModal=({open, handleClose})=>{
    const {
        status,
        error,
        selectedSeatId, 
        price
    } = React.useContext(BookingContext);

    

    return (
        <div>
        <Dialog id="modal" 
                open={(selectedSeatId !== null) ? open : null} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                Purchase Ticket
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are purchasing
                </DialogContentText>
            
                <DialogContentText>
                    {selectedSeatId} for ${price}
                </DialogContentText>

                <DialogContentText>
                    Please enter your credit card details below.
                </DialogContentText>

                <form >
                    <span>
                        <TextField
                            id="card-number"
                            label="Credit Card Number"
                            type="input"
                        />
                    </span>
                    <span>
                        <TextField
                            id="expiration"
                            label="Expiration"
                            type="input"
                        />
                    </span>
                    <span>
                        <Button onClick={handleClose} color="primary">
                            Subscribe
                        </Button>
                    </span>
                </form>
            
            </DialogContent>
            
        </Dialog>
        </div>
    );
}

export default PurchaseModal;