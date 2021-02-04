import React, { useContext, useState } from "react";
import { BookingContext } from "./BookingContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export const PurchaseModal = () => {
    const {
        bookingInfos: { selectedSeatId, seat },
        actions: {
            purchaseRequest,
            purchaseSuccess,
            purchaseFailure,
            purchaseCanceled,
        },
    } = useContext(BookingContext);
    const [creditCard, setCreditCard] = useState("");
    const [expiration, setExpiration] = useState("");

    const handlePurchase = () => {
        purchaseRequest();
        try {
            fetch("/api/book-seat", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    seatId: selectedSeatId,
                    creditCard: creditCard,
                    expiration: expiration,
                }),
            }).then((res) => res.json());
            // .then((data) => console.log(data));
            purchaseSuccess();
        } catch (error) {
            console.log(error);
            purchaseFailure();
        }
    };

    return (
        <Dialog open={selectedSeatId !== null} onClose={purchaseCanceled}>
            <DialogTitle>Purchase ticket</DialogTitle>
            <DialogContent>
                {seat && (
                    <DialogContentText>
                        You are purchasing 1 ticket for the price of{" "}
                        {seat.price}$
                    </DialogContentText>
                )}
                <DialogContentText>
                    Seat selected: {selectedSeatId}
                </DialogContentText>
                <TextField
                    margin="dense"
                    type="text"
                    placeholder="Credit Card"
                    onChange={(e) => {
                        setCreditCard(e.target.value);
                    }}
                />
                <TextField
                    margin="dense"
                    type="text"
                    placeholder="Expiration"
                    onChange={(e) => {
                        setExpiration(e.target.value);
                    }}
                />
                <DialogActions>
                    <Button
                        onClick={(e) => {
                            handlePurchase();
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
