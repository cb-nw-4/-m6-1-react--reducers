import React, {useContext} from "react";
import seatAvailable from "../assets/seat-available.svg";
import styled from "styled-components";
import { BookingContext } from "./BookingContext";
import { getSeatNum } from "../helpers";

const Seat = ({bookingStatus, rowName, seatIndex, price}) => {

    const {
        state: { status, selectedSeatId },
        actions: { beginBookingProcess },
      } = React.useContext(BookingContext);

      const bookSeat = () => {
        beginBookingProcess({
            status: 'seat-selected',
            selectedSeatId: `${rowName}-${getSeatNum(seatIndex)}`,
            price,
        })
    };

  return (
    <div>
      {bookingStatus === false ?
        <Button onClick={bookSeat}>
          <img alt="available seat" src={seatAvailable} />
        </Button> : 
        <Button disabled={true}>
          <img alt="unavailable seat" src={seatAvailable}  style={{filter: "grayscale(100%)"}} />
        </Button>
      }
    </div>      
  )
}

const Button = styled.button` 
  margin: 0;
  padding: 0;
  border: none;
`;

export default Seat;
