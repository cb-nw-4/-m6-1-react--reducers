import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import { Seat } from "./Seat";

const TicketWidget = () => {
    // TODO: use values from Context
    const {
        state: { numOfRows, seatsPerRow, hasLoaded, seats },
    } = useContext(SeatContext);

    // console.log(seats);
    return (
        <Wrapper>
            {hasLoaded ? (
                range(numOfRows).map((rowIndex) => {
                    const rowName = getRowName(rowIndex);

                    return (
                        <Row key={rowIndex}>
                            <RowLabel>Row {rowName}</RowLabel>

                            {range(seatsPerRow).map((seatIndex) => {
                                const seatId = `${rowName}-${getSeatNum(
                                    seatIndex
                                )}`;
                                const seat = seats[seatId];

                                return (
                                    <SeatWrapper key={seatId}>
                                        <Seat
                                            seatId={seatId}
                                            seat={seat}
                                            rowIndex={rowIndex}
                                            seatIndex={seatIndex}
                                            price={seat.price}
                                            status={seat.isBooked}
                                        />
                                    </SeatWrapper>
                                );
                            })}
                        </Row>
                    );
                })
            ) : (
                <Loading>
                    <CircularProgress size={80} />
                </Loading>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 8px;
    width: 60%;
    min-width: 800px;
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
    color: black;
    margin: auto;
`;

const SeatWrapper = styled.div`
    padding: 5px;
`;

const Loading = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export default TicketWidget;
