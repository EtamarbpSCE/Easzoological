import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography, IconButton, Stack, MenuItem, Badge } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '80%', sm: '400px' }, // Use 90% of the screen width on extra small devices, and 400px otherwise
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto', // Add scroll for smaller screens if content is too long
    maxHeight: '90vh', // Ensure modal doesn't exceed the viewport height
};



function OpenVetCallModal() {
    const [open, setOpen] = useState(false);
    const [animalName, setAnimalName] = useState('');
    const [caseDescription, setCaseDescription] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setImagePreviews([])
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const filesArray = Array.from(event.target.files).slice(0, 3 - images.length); // Limit number of files
            setImages([...images, ...filesArray]);

            const fileReaders = filesArray.map((file) => {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    setImagePreviews((prev) => [...prev, e.target.result]);
                };
                return fileReader.readAsDataURL(file);
            });
        }
    };
    
    const handleDeleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    };

    
    const animalOptions = [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Rabbit', value: 'rabbit' },
        // Add more animal options here
    ];



    return (
        <div>
            <Button onClick={handleOpen}>Open Vet Call</Button>
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
                    <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Animal Name"
                                select
                                value={animalName}
                                onChange={(e) => setAnimalName(e.target.value)}
                                helperText="Please select the animal"
                            >
                                {animalOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/* The rest of the form elements remain the same */}
                        </Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Case Description"
                            multiline
                            rows={4}
                            inputProps={{ style: { resize: 'none' } }}
                            value={caseDescription}
                            onChange={(e) => setCaseDescription(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ mt: 2 }}
                        >
                            Upload Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                capture="environment"
                                onChange={handleImageChange}
                                multiple
                            />
                        </Button>
                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            {imagePreviews.map((src, index) => (
                                <Badge key={index} overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} badgeContent={
                                    <IconButton aria-label="delete" size="small" onClick={() => handleDeleteImage(index)}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                }>
                                    <Box component="img" sx={{ height: 100, width: 100, borderRadius: '4px' }} alt={`upload-${index}`} src={src} />
                                </Badge>
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default OpenVetCallModal;
