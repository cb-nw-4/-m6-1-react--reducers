import React, { useContext, useEffect } from 'react';

import GlobalStyles from './GlobalStyles';
import { SeatContext } from './SeatContext';
import TicketWidget from './TicketWidget';

function App() {

  const {    
       action: { receiveSeatInfoFromServer },
     } = useContext(SeatContext);

     useEffect(()=>{
        fetch('/api/seat-availability')
          .then(res=>res.json())
          .then((json) => {                        
            if (json){             
              receiveSeatInfoFromServer(json);            
            }             
        })
     }, [receiveSeatInfoFromServer]);

   
  return (
    <>
      <GlobalStyles />
        <TicketWidget></TicketWidget>
    </>
  );
}

export default App;
