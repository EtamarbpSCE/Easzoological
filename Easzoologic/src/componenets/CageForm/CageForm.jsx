import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Button, LinearProgress, TextField, Box, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import api from '../../constants/axios.config';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const FormikMuiTextField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  const touched = form.touched[field.name];
  return (
    <TextField
      {...field}
      {...other}
      error={Boolean(touched && currentError)}
      helperText={touched && currentError}
    />
  );
};

const CageForm = ({ setPageState, pageState }) => {
    const [openConfirmDialog, setOpenConfirmDialog] = useState({ show: false, message: "Submission done" });
    const [formValues, setFormValues] = useState({
        animalType: '',
        title: '',
        description: '',
        animals: [
            { animalType: '', animalName: '', animalAge: '' }
        ]
    });
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [cageId, setCageId] = useState(null);

    const getCageInfo = async (id) => {
        try {
            const response = await api.get(`info/cage/${id}`);
            const userData = response.data.rows[0];
            console.log("userData ", userData)
            setFormValues({
                animalType: userData.animal_type || '',
                title: userData.title || '',
                description: userData.content || '',
                animals: JSON.parse(userData.animals) || [{ animalType: '', animalName: '', animalAge: '' }]
            });
            console.log(response.data);
        } catch (e) {
            console.log('Cannot retrieve user ', e);
        }
    };

    useEffect(() => {
        const searchUserId = searchParams.get('id');
        console.log(searchUserId);
        if (searchUserId) {
            setCageId(searchUserId);
            getCageInfo(searchUserId);
        }  
    }, [searchParams]);

    const handleToggleConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setPageState(prev => ({
            ...prev,
            signUp: false
        }));
    };

    const backToPanel = () => {
       navigate(-1);
    };

    return (
        <>
        <Box>
        <div>
            <Typography variant='h2' color='primary'>Add New Cage</Typography>
        </div>
        <Formik
            enableReinitialize
            initialValues={formValues}
            validator={values => {
                const errors = {};
                if (!values.animalType) {
                    errors.animalType = 'Required';
                }
                if (!values.title) {
                    errors.title = 'Required';
                }
                if (!values.description) {
                    errors.description = 'Required';
                }
                values.animals.forEach((animal, index) => {
                    if (!animal.animalType) {
                        errors[`animals.${index}.animalType`] = 'Required';
                    }
                    if (!animal.animalName) {
                        errors[`animals.${index}.animalName`] = 'Required';
                    }
                    if (!animal.animalAge) {
                        errors[`animals.${index}.animalAge`] = 'Required';
                    }
                });
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                const url = cageId ? '/admin/new_cage/' + cageId : '/admin/new_cage';
                try {
                    const res = await api.post(url, values);
                    setSubmitting(false);
                    if (res.data.code === 1) {
                        setOpenConfirmDialog(prev => ({ message: 'Error occurred.', show: true }));
                        return;
                    }
                    setOpenConfirmDialog(prev => ({ ...prev, show: true }));
                } catch (e) {
                    console.log('Error submitting:', e);
                }
            }}
        >
            {({ submitForm, isSubmitting }) => (
            <Form>
                <Box margin={2}>
                <Field
                    component={FormikMuiTextField}
                    name="animalType"
                    type="text"
                    label="Animal Type"
                    fullWidth
                    required
                />
                </Box>
                <Box margin={2}>
                <Field
                    component={FormikMuiTextField}
                    name="title"
                    type="text"
                    label="Title"
                    fullWidth
                    required
                />
                </Box>
                <Box margin={2}>
                <Field
                    component={FormikMuiTextField}
                    name="description"
                    type="text"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    required
                />
                </Box>
                <FieldArray name="animals">
                {({ push, remove, form }) => (
                    <>
                    {form.values.animals.map((_, index) => (
                        <Box key={index} margin={2} display="flex" alignItems="center">
                        <Field
                            component={FormikMuiTextField}
                            name={`animals.${index}.animalType`}
                            type="text"
                            label="Animal Type"
                            fullWidth
                            required
                            disabled
                            value={form.values.animalType} 
                        />
                        <Field
                            component={FormikMuiTextField}
                            name={`animals.${index}.animalName`}
                            type="text"
                            label="Animal Name"
                            fullWidth
                            required
                        />
                        <Field
                            component={FormikMuiTextField}
                            name={`animals.${index}.animalAge`}
                            type="text"
                            label="Animal Age"
                            fullWidth
                            required
                        />
                        <IconButton onClick={() => remove(index)}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        </Box>
                    ))}
                    <Button
                        variant="outlined"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() =>
                        push({ animalType: '', animalName: '', animalAge: '' })
                        }
                    >
                        Add Animal
                    </Button>
                    </>
                )}
                </FieldArray>
                <Box margin={2}>
                {isSubmitting && <LinearProgress />}
                </Box>
                <Box margin={2} justifyContent={'space-between'} display={'flex'}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={backToPanel}
                    >
                        Go Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Box>
            </Form>
            )}
        </Formik>
        <Dialog
            open={openConfirmDialog.show}
            onClose={handleToggleConfirmDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{'Confirm Action'}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {openConfirmDialog.message}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleToggleConfirmDialog}>Close</Button>
            </DialogActions>
        </Dialog>
        </Box>
        </>
    );
};

export default CageForm;
