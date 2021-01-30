import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { BookingContext } from './BookingContext';


  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SnackBar = ()=>{    
    const {state: {status},
          action: { finishBookingProcess }} = useContext(BookingContext);   

    const handleClose =  ()=>{
        finishBookingProcess();
    };

    return (
        <Snackbar open={status === 'purchased'} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="success">
          Successfully purchased ticket! Enjoy the show.
        </Alert>
      </Snackbar>
      );
};

export default SnackBar;
