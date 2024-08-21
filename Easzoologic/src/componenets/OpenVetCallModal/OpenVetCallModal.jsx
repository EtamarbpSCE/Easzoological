import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, TextField, Typography, IconButton, Stack, MenuItem, Badge } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../constants/axios.config';


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



function OpenVetCallModal( { cageId } ) {
    const [open, setOpen] = useState(false);
    const [animalId, setAnimalId] = useState('');
    const [caseDescription, setCaseDescription] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [animalsNames, setAnimalsNames] = useState([]);
    const [succesfull, setSuccessful] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setImagePreviews([])
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setIsSubmitted(true);

        const formData = new FormData();
        formData.append('cage_id', cageId);
        formData.append('animal_id', animalId);
        formData.append('description', caseDescription);
        images.forEach((image) => {
            formData.append('images_array', image);
        });

        try {
            const results = await api.post('vets/vet_call', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccessful(true);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setSuccessful(false);
            setIsLoading(false);
        }
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


    const getAnimalsName = async () => {
        try{

            const results = await api.get(`/info/cage/${1}`)
            console.log(results);
            const animalsArray = results.data.rows.map(element => ({
                    label:element.animal_name,
                    value:element.id
                })
            )
            setAnimalsNames(animalsArray)
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        getAnimalsName();
    }, [])



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
                                value={animalId}
                                onChange={(e) => setAnimalId(e.target.value)}
                                helperText="Please select the animal"
                            >
                                {animalsNames.map((option) => (
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
                    <Button
                            onClick={handleSubmit}
                            variant="contained"
                            component="label"
                            sx={{ mt: 2 }}
                        >
                            Submit
                    </Button>
                    {!isLoading && isSubmitted && <Box color={succesfull ? 'green' : 'red'}>{succesfull ? "Submitted succesfully" : "Error submitting the form"}</Box>}
                </Box>
            </Modal>
        </div>
    );
}

export default OpenVetCallModal;
