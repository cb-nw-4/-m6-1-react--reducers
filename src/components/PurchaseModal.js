import React, {useContext} from 'react'
import Dialog from '@material-ui/core/Dialog';
import {BookingContext} from './BookingContext'

export const PurchaseModal = () => {
  const {state, actions:{cancelBookingProcess}} = useContext(BookingContext)
  console.log(state)
  return (
    <Dialog open={state.status == 'start' ? true : false} onClose={() => {cancelBookingProcess()}}>
      Salam
    </Dialog>
  )
}
