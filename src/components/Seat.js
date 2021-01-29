import React from "react";
import seatAvailable from "../assets/seat-available.svg";
import styled from "styled-components";

const Seat = ({rowName, seatIndex, width, height, price, status}) => {

    console.log(status);

  return (
    <div>
      {status === false ?
        <Button><img alt="available seat" src={seatAvailable} /></Button> : 
        <Button disabled={true}><img alt="unavailable seat" src={seatAvailable}  style={{filter: "grayscale(100%)"}} /></Button>
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
