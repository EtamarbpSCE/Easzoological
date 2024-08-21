import React, { useState } from 'react';
import { Button, Modal, Box, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '80%', sm: '600px' }, // Use 80% of the screen width on extra small devices, and 600px otherwise
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto', // Add scroll for smaller screens if content is too long
    maxHeight: '90vh', // Ensure modal doesn't exceed the viewport height
};

const sampleData = [
    { id: 1, name: 'Bella', lastChecked: '2024-07-10', treatment: 'Vaccination' },
    { id: 2, name: 'Charlie', lastChecked: '2024-06-15', treatment: 'Check-up' },
    { id: 3, name: 'Max', lastChecked: '2024-05-20', treatment: 'Surgery' },
    // Add more rows as needed
];

function CheckHistoryModal() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant={'outlined'} style={{marginTop:'5px'}} onClick={handleOpen}>Open Cage Info</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Open Vet Call
                    </Typography>
                    <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Last Checked</TableCell>
                                    <TableCell>Treatment</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sampleData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.lastChecked}</TableCell>
                                        <TableCell>{row.treatment}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </div>
    );
}

export default CheckHistoryModal;
