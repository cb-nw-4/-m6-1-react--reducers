import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { BookingContext } from './BookingContext';

const PurchaseModal=()=>{
    const {
        selectedSeatId, 
        price,
        actions: {
            cancelBookingProcess,purchaseTicketRequest,
            purchaseTicketFailure,
            purchaseTicketSuccess,},
    } = React.useContext(BookingContext);

    const [creditCard, setCreditCard] = React.useState("");
    const [expiration, setExpiration] = React.useState("");
    const [theSeat, setTheSeat]=useState(null);
    const [theRow, setTheRow]=useState(null);

    useEffect(()=>{
        if(selectedSeatId !== null){
            const arr=selectedSeatId.split("-");
            setTheRow(arr[0]);
            setTheSeat(arr[1]);
        }
    },[selectedSeatId]);

    const handleClose = () => {
        cancelBookingProcess();
        setExpiration("");
        setCreditCard("");
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        purchaseTicketRequest();
        //sending POST request
        fetch('/api/book-seat', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "seatId" : selectedSeatId,
                "creditCard" : creditCard,
                "expiration" : expiration,
            })
        })
        .then(res=>res.json())
        // .then(res=>console.log(res))
        .then(res=>{
            if(res.status !== 200){
                purchaseTicketFailure(res.message);
                
            }
            else{
                purchaseTicketSuccess();
            }
        })
        .catch(err=>console.log(err))
    }
    
    return (
        <Wrapper>
        <Dialog id="modal" 
                open={(selectedSeatId !== null) ? true : false} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title">

            <ModalTitle id="form-dialog-title" >
                Purchase Ticket
            </ModalTitle>

            <DialogContent>
                <DialogContentText>
                You're purchasing <strong>1</strong> ticket for the price of ${price}.
                </DialogContentText>

                <TableContainer align="center" fontSize='16px'>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Row</TableCell>
                                <TableCell>Seat</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{theRow}</TableCell>
                                <TableCell>{theSeat}</TableCell>
                                <TableCell>{price}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <DialogContentText style={{margin:'10px'}}>
                    Please enter your credit card details below.
                </DialogContentText>

                <form onSubmit={handleSubmit}>
                    <span>
                        <TextField
                            id="card-number"
                            label="Credit Card Number"
                            type="input"
                            value={creditCard}
                            required
                            onChange={(ev)=>setCreditCard(ev.target.value)}
                        />
                    </span>
                    <span>
                        <TextField
                            id="expiration"
                            label="Expiration"
                            type="input"
                            value={expiration}
                            required
                            onChange={(ev=>setExpiration(ev.target.value))}
                        />
                    </span>
                    <span>
                        <Button color="primary"
                                type="submit"
                        >
                            Purchase
                        </Button>
                    </span>
                </form>

            </DialogContent>

        </Dialog>
        </Wrapper>
    );
};

const Wrapper=styled.div`
    padding:20px;
`;

const ModalTitle=styled.h1`
    margin:10px 0px 0px 20px;
`;

export default PurchaseModal;