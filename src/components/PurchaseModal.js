import React, { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { BookingContext } from './BookingContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    button: {  
        margin: '15px 10px',   
       padding: '15px 25px',
       width: '125px',
       height: '55px'
    },
    textField: {
        margin: '15px 10px 15px 0',
    },
    expirationField: {
        margin: '15px 10px',
        width: '100px'
    },
    form: {
        display: 'flex',
        alignItems: 'center'
    },
    formBox: {
        padding: '30px 20px 30px 30px',
        backgroundColor: '#E8E8E8',      
        margin: '30px 0px'    
    },
    container: {
        width: '600px',
        paddind: '0px'
    },
    tableContainer: {
        width: '300px',
        margin: 'auto'
    },
    title: {
        margin: '30px'
    },
    paragraph: {
        margin: '0px 0px 30px 30px'
    },
    error: {
        fontSize: '14px',
        color: 'red',
        width: '100%',
        textAlign: 'center'

    }
  });

const PurchaseModal =({ close })=>{
    const [creditCard, setCreditCard] = React.useState("");
    const [expiration, setExpiration] = React.useState("");
    const {state: { status, error, selectedSeatId, price },
           action: { cancelBookingProcess, purchaseTicketRequest,  purchaseTicketFailure,  purchaseTicketSuccess }} = useContext(BookingContext); 
  const classes = useStyles();

  const handleSubmitpurchase = (ev)=>{
    ev.preventDefault();   
    purchaseTicketRequest();   
    fetch("/api/book-seat", {
        method: "POST",
        body: JSON.stringify({
            seatId: selectedSeatId,
            creditCard: creditCard,
            expiration: expiration
          }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((json) => {
            console.log('jsonpsot', json);
            if (json.status === 200) {
                
                setCreditCard("");
                setExpiration("");
                purchaseTicketSuccess();
            } 
            else {
                purchaseTicketFailure(json.message)
            }
        })
        .catch((error)=>{     
            console.log('crashed');       
            purchaseTicketFailure(error);
          })
  };
    
    const handleCloseModal = ()=>{     
        setCreditCard("");
        setExpiration("");
        cancelBookingProcess();
    };

    return(
        <> 
        <Dialog
            open={selectedSeatId !== null}
            onClose={handleCloseModal} 
         >            
            <h1 className={classes.title}>Purchase ticket</h1>
            <p className={classes.paragraph}>Your purchasing <strong>1</strong> for the price of ${price}</p>
            <TableContainer className={classes.tableContainer} >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>           
                            <TableCell align="center">Row</TableCell>
                            <TableCell align="center">Seat</TableCell>
                            <TableCell align="center">Price</TableCell>          
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>           
                            <TableCell align="center">{selectedSeatId && selectedSeatId[0]}</TableCell>
                            <TableCell align="center">{selectedSeatId && selectedSeatId.slice(2)}</TableCell>
                            <TableCell align="center">{`$${price}`}</TableCell>          
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box className={classes.formBox} >
            <h3>Enter payment details</h3>
            <form  className={classes.form}  noValidate autoComplete="off" >
               
                <TextField 
                    className={classes.textField} 
                    label="credit card" 
                    variant="outlined"                  
                    value={creditCard}
                    onChange={(ev)=>(setCreditCard(ev.target.value))} />
                <TextField  
                    className={classes.expirationField} 
                    label="Expiration" 
                    variant="outlined"
                    value={expiration}
                    onChange={(ev)=>(setExpiration(ev.target.value))} />
                <Button  
                    className={classes.button} 
                    variant="contained" 
                    color="primary"
                    onClick={handleSubmitpurchase}
                    >
                    {status === "awaiting-response" ? <CircularProgress size={25} color='inherit'/> : 'Purchase'}
                </Button >
             </form>
             {error &&
                <p className={classes.error} >{error}</p>}

            </Box>
            
        </Dialog>
        </>
    );
};


export default PurchaseModal;
