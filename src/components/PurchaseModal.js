import React, { useContext, useState } from 'react';

import { BookingContext } from './BookingContext';
import { SeatContext } from './SeatContext';

import { getSeatNum } from '../helpers';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    table: {
        minWidth: 500,
        marginBottom: '15px'
    },
}));

const PurchaseModal = ({ price }) => {
    const [creditCard, setCreditCard] = useState('');
    const [expiration, setExpiration] = useState('');
    const { 
        selectedSeatId,
        status,
        error,
        actions: { 
            cancelBookingProcess,
            purchaseTicketRequest,
            purchaseTicketFailure,
            purchaseTicketSuccess,
            purchaseTicketAlreadyTaken,
            purchaseTicketUnknownError
        }
    } = useContext(BookingContext);
    const { 
        actions: {
            markSeatAsPurchased 
        }
    } = useContext(SeatContext);

    const classes = useStyles();

    const grayBoxStyle = { 
        width: '500px', 
        height: '180px', 
        background: '#F0F0F0',
        paddingTop: '0.5px',
    }

    const updateCreditCard = (event) => {
        setCreditCard(event.target.value);
    }

    const updateExpiration = (event) => {
        setExpiration(event.target.value);
    }

    const handlePurchase = () => {
        purchaseTicketRequest();
        const seatId = `${selectedSeatId.row}-${getSeatNum(selectedSeatId.seat)}`;

        fetch('/api/book-seat', {
            method: "POST",
            body: JSON.stringify(
                {
                    seatId: seatId,
                    creditCard: creditCard,
                    expiration: expiration
                }
            ),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.status === 200) {
                    purchaseTicketSuccess();
                    markSeatAsPurchased(seatId);
                    setCreditCard('');
                    setExpiration('');
                }
                else if (json.status === 400) {
                    purchaseTicketFailure();
                }
                else if (json.message === "This seat has already been booked!") {
                    purchaseTicketAlreadyTaken();
                    markSeatAsPurchased(seatId);
                }
                else if (json.message === "An unknown error has occurred. Please try your request again.") {
                    purchaseTicketUnknownError();
                }
            })
            .catch((err) => console.log(err));
    }
    

    return (
        <Dialog 
            open={selectedSeatId !== null} 
            onClose={() => {
                cancelBookingProcess();
                setCreditCard('');
                setExpiration('');
            }} 
            aria-labelledby="purchase-ticket">
            <DialogTitle id="purchase-ticket">Purchase Ticket</DialogTitle>
            <DialogContent>
                <DialogContentText style={{color: 'black'}}>
                    You're purchasing <b>1</b> ticket for the price of ${price}.
                </DialogContentText>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Row</TableCell>
                            <TableCell>Seat</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">{selectedSeatId && selectedSeatId.row}</TableCell>
                            <TableCell align="left">{selectedSeatId && (selectedSeatId.seat + 1)}</TableCell>
                            <TableCell align="left">{`$${price}`}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div style={grayBoxStyle}>
                    <DialogContentText style={{fontSize: '20px', color: 'black', display: 'block', margin: '20px'}}>
                        <b>Enter payment details</b>
                    </DialogContentText>
                    <form className={classes.root} autoComplete="off">
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Credit card"
                            name="credit"
                            type="credit"
                            style={{width: '25ch'}}
                            value={creditCard} 
                            onChange={updateCreditCard}
                        />
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Expiration"
                            name="expiration"
                            type="expiration"
                            placeholder="MM/YY"
                            style={{width: '13ch'}}
                            value={expiration} 
                            onChange={updateExpiration}
                        />
                        {status !== 'awaiting-response' ? (
                            <Button 
                                variant="contained" 
                                color="primary" 
                                style={{height: "55px"}}
                                onClick={handlePurchase}
                            >
                                PURCHASE
                            </Button>
                        ) : (
                            <Button 
                                variant="contained" 
                                color="primary" 
                                style={{height: "55px", width: '107px'}}
                                onClick={handlePurchase}
                            >
                                <CircularProgress />
                            </Button>
                        )}
                    </form>
                    {status === 'error' &&
                        <DialogContentText style={{fontSize: '15px', color: 'red', position: 'relative', left: '10px'}}>
                            {error}
                        </DialogContentText>
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PurchaseModal;