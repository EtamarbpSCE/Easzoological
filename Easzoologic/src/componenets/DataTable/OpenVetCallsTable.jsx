import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {  Card, CardContent, CardMedia, Grid, Link, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Button, TextField } from '@mui/material';
import { useRef } from 'react';
import { useState } from 'react';
import api from '../../constants/axios.config';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto'
};


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage('');
  };


  const handleToggleConfirmDialog = () => {
    setOpenConfirmDialog(!openConfirmDialog);
  };

  const handleConfirmDone = async () => {
    // Here you can add the logic to mark the call as done
    const openalls = await api.post('/vets/close_call', { call_id:row.id});
    console.log("Call marked as done!");
    setOpenConfirmDialog(false);
    setRefetch(true);
  };



  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
        <TableCell >
          <IconButton
            aria-label="expand row"
            size="small"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.cage_id}</TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">{row.creationDate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {row.expended_info.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Type: {row.expended_info.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Age: {row.expended_info.age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Description: {row.expended_info.desciption}
                </Typography>
                <Grid container spacing={2} justifyContent="start" sx={{ p: 2 }}>
                    {JSON?.parse(row.images).map((image, index) => (
                        <Grid item xs={4} key={index}>
                            <Button 
                                variant='contained'
                                color='primary'
                                onClick={() => handleOpenModal('http://localhost:3001' + image)}
                            >
                                Image {index + 1}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleToggleConfirmDialog}>
                        Done
                    </Button>
                </Box>
                <Dialog
                    open={openConfirmDialog}
                    onClose={handleToggleConfirmDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to mark this call as done?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleToggleConfirmDialog}>Cancel</Button>
                    <Button onClick={handleConfirmDone} autoFocus>
                        Confirm
                    </Button>
                    </DialogActions>
                </Dialog>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <IconButton aria-label="close" onClick={handleCloseModal} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
                <CardMedia
                    component="img"
                    image={selectedImage}
                    alt="Selected Animal Image"
                    sx={{ maxHeight: '80vh', maxWidth: '100%', borderRadius: '4px' }}
                />
            </Box>
        </Modal>
    </React.Fragment>
  );
}


Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};



export default function OpenVetCallsTable({tableRows, setRefetch}) {

  return (
    <>
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>Call ID</TableCell>
                <TableCell align="right">Cage ID</TableCell>
                <TableCell align="right">Animal Type</TableCell>
                <TableCell align="right">Creation Date</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableRows.map((row) => (
                <Row key={row.name} row={row} setRefetch={setRefetch} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}
