import React, { useContext } from 'react';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import { getSeatNum } from '../helpers';
import { BookingContext } from './BookingContext';
import seatImg from "../assets/seat-available.svg";


const Seat = ({rowName, seatIndex, price, status})=>{  

    const {    
        action: { beginBookingProcess },
      } = useContext(BookingContext);

    const handleClickSeatButton = ()=>{    
        beginBookingProcess({ selectedSeatId: `${rowName}-${getSeatNum(seatIndex)}`,
                              price});
    };

    return(       
        <Tippy content={`Row ${rowName}, Seat ${getSeatNum(seatIndex)} - $ ${price}`} enabled={status === 'available'} hideOnClick={true}>
            <SeatWrapper status={status}>            
                <SeatButton onClick={handleClickSeatButton} disabled={status === 'unavailable'}> 
                    <img src={seatImg} alt="seat"/>
                </SeatButton>                    
            </SeatWrapper>
        </Tippy>        
    );
};

const SeatWrapper = styled.div`
  padding: 5px;
  filter: ${(p)=> (p.status === 'unavailable' ? 'grayscale(100%)' : null)};
`;

const SeatButton = styled.button`
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  
 // position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;


  &:active {
    color: inherit;
  }
`;

export default Seat;