import React, { useContext } from "react";
import styled from "styled-components";
import Seat from "../assets/seat-available.svg";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

const TicketWidget = () => {
    // TODO: use values from Context
    const {
        state: { numOfRows, seatsPerRow },
    } = useContext(SeatContext);

    // TODO: implement the loading spinner <CircularProgress />
    // with the hasLoaded flag

    return (
        <Wrapper>
            {range(numOfRows).map((rowIndex) => {
                const rowName = getRowName(rowIndex);

                return (
                    <Row key={rowIndex}>
                        <RowLabel>Row {rowName}</RowLabel>
                        {range(seatsPerRow).map((seatIndex) => {
                            const seatId = `${rowName}-${getSeatNum(
                                seatIndex
                            )}`;

                            return (
                                <SeatWrapper key={seatId}>
                                    <img alt="seat-icon" src={Seat} />
                                </SeatWrapper>
                            );
                        })}
                    </Row>
                );
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 8px;
    width: 40%;
    min-width: 780px;
    margin: 10% auto;
`;

const Row = styled.div`
    display: flex;
    position: relative;

    &:not(:last-of-type) {
        border-bottom: 1px solid #ddd;
    }
`;

const RowLabel = styled.div`
    font-weight: bold;
    margin: auto;
`;

const SeatWrapper = styled.div`
    padding: 5px;
`;

export default TicketWidget;
