import React, {useContext, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BookingContext } from './BookingContext';
import CircularProgress from '@material-ui/core/CircularProgress';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { SeatContext } from './SeatContext';
import{decodeSeatId} from '../helpers';




const useStyles = makeStyles((theme) => ({

    form: {
        display: 'flex',
        margin: theme.spacing(1),
        
        justifyItems: 'space-between',
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}




const PurchaseModel = () => {

    const {
        state: {status, selectedSeatId, price, creditCard, expiration, error},
        actions: {DuringBookingProcess, 
                updateField,
                ErrorDuringProcess,
                EndBookingProcess,
                RestStatus}
        
    } = useContext(BookingContext);


    const {rowName, seatNum}= decodeSeatId(selectedSeatId)


    const { 
        state:{seats},
        actions:{
            markSeatAsPurchased
    }} = useContext(SeatContext)


    function createData(name, row, seat, price) {
        return { row, seat, price };
    }

    const rows = [
        createData("selectedSeat",rowName, seatNum, price)
    ];

    
    const handleSubmit = (ev) =>{

        ev.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seatId:selectedSeatId, creditCard, expiration})
        };

        fetch('/api/book-seat', requestOptions)
        .then(res =>{
            if(res.status === 200){
                EndBookingProcess({status: 'purchased', 
                                price:null, 
                                selectedSeatId: null, 
                                error: null,
                                creditCard: '',
                                expiration: '',
                            })
                // markSeatAsPurchased({selectedSeatId})
            } else{
                throw(res)
            }
            })
       // .then(data => DuringBookingProcess({status: 'awaiting-response'}))
        .catch(err => {
            if (err.text) {
                err.json().then( error=> {
                    ErrorDuringProcess({Status: 'error', error: error.message})
                })
            }else{
                console.log(error)
            }
        })
    }

    
    return (

        <Dialog 
        open={selectedSeatId !== null}  
        onClose= {selectedSeatId === null} 
        aria-labelledby="form-dialog-title"
        >


        <DialogTitle id="form-dialog-title">Purchse Ticket</DialogTitle>
        <DialogContent>
            <DialogContentText>
                You're purchasing 1 ticket for the price of ${price}
            </DialogContentText>

            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Row</TableCell>
                        <TableCell align="right">Seat</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="right">{row.row}</TableCell>
                            <TableCell align="right">{row.seat}</TableCell>
                            <TableCell align="right">${row.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </DialogContent>
        <DialogContent>

            <DialogTitle>
                Enter payment Details
            </DialogTitle>

            <form noValidate autoComplete="off">
                <TextField id="creditCard" 
                        required label="Card number" 
                        value={creditCard} 
                        variant="outlined" 
                        onChange={(ev) => updateField('creditCard', ev.target.value)}
                        />
                <TextField id="expiration" 
                            required label="Expiration date" 
                            value= {expiration} 
                            variant="outlined" 
                            error={expiration===''}
                            helperText={expiration===''? error : ' ' }
                            onChange={(ev) => updateField('expiration', ev.target.value)}/>
                <Button 
                    onClick={(ev) => handleSubmit(ev)}
                    color="primary" 
                    variant="contained"
                >
                    Purchse
                </Button>
            </form>


        </DialogContent>

        <div>

            <Snackbar open={status==='purchased'} autoHideDuration={6000} >
            <Alert severity="success"  >
                This is a success message!
            </Alert>
            </Snackbar>

        </div>

        </Dialog>
    );
}

export default PurchaseModel;