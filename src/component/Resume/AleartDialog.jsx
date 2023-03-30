import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AleartDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  return (
   <>
      <Button variant="outlined" onClick={handleClickOpen}>
        X </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         Remove The Record
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to remove
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Delete</Button>
          <Button onClick={handleClose} autoFocus>
           Close
          </Button>
        </DialogActions>
      </Dialog>
 
   </>
  )
}

export default AleartDialog





 

 