import React, { useContext, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";
import { PurchaseModal } from "./PurchaseModal";

function App() {
    const {
        actions: { receiveSeatInfoFromServer },
    } = useContext(SeatContext);

    useEffect(() => {
        fetch("/api/seat-availability")
            .then((res) => res.json())
            .then((data) => receiveSeatInfoFromServer(data));
    }, [receiveSeatInfoFromServer]);

    return (
        <>
            <GlobalStyles />
            <TicketWidget />
            <PurchaseModal />
        </>
    );
}

export default App;
