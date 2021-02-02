import React, {useContext} from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import seatAvailable from "../assets/seat-available.svg";
import { BookingContext } from './BookingContext';

import {encodeSeatId, getRowName } from '../helpers';


const Seat = ({rowIndex, seatIndex, width, heigth, price, status}) => {

    

    const infoSeat = `Row ${getRowName(rowIndex)}, Seat ${seatIndex} - $${price}`

    const selectedSeatId = `${encodeSeatId(rowIndex, seatIndex)}`

    const {
        actions: { beginBookingProcess },
    } = useContext(BookingContext);

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(0.25),
            width:`${width}px`,
            height: `${heigth}px`,

        },
        customWidth: {
            fontSize: '14px'
        },
        }));

        const classes = useStyles();


    return ( 
        <Button className={classes.button} disabled={status === 'unavailable'}
            onClick={() => beginBookingProcess({selectedSeatId, price})}>
            <Tooltip title={infoSeat} placement="top" classes={{ tooltip: classes.customWidth}}>
            <Img 
                    className={`${status}`} 
                    src= {seatAvailable}
                />
            </Tooltip>
        </Button>
    );
}


const Img = styled.img`
    
    width: 36px;
    height: 36px;

    &.unavailable{
        filter: grayscale(100%);
    }
`


export default Seat;