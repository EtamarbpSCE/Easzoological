import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function YesNoPopup({ isOpen, handleClose, title, content }) {
  // Function to handle the "Yes" action
  const handleYes = () => {
    handleClose(true); // Pass true to indicate "Yes" was clicked
  };

  // Function to handle the "No" action
  const handleNo = () => {
    handleClose(false); // Pass false to indicate "No" was clicked
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose(false)} // Optional: close the dialog on backdrop click or escape key press
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNo} color="primary">
          No
        </Button>
        <Button onClick={handleYes} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default YesNoPopup;
