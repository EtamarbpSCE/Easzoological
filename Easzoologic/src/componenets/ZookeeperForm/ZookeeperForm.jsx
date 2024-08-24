import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, MenuItem, TextField, Box } from '@mui/material';
import OpenVetCallModal from '../OpenVetCallModal/OpenVetCallModal';
import api from '../../constants/axios.config';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Custom component to integrate MUI TextField with Formik
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

const ZookeeperForm = ({cageId}) => {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);


    const handleToggleConfirmDialog = () => {
        setOpenConfirmDialog(!openConfirmDialog);
    };
    return (
        <>
        <Formik
            initialValues={{
                amount: '',
                foodType: '',
                units: '',
                cageId:cageId
            }}
            validate={values => {
                const errors = {};
                if (!values.amount) {
                    errors.amount = 'Required';
                }
                if (!values.foodType) {
                    errors.foodType = 'Required';
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                try{
                    await api.post('/keeper/feed_log', values)
                    setSubmitting(false);
                    setOpenConfirmDialog(true);
                }catch(e){
                    console.log("Error submitting:" , e)
                }
                // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    // }, 400);
            }}
        >
            {({ submitForm, isSubmitting }) => (
                <Form>
                    <Box margin={2}>
                        <Field
                            component={FormikMuiTextField}
                            name="amount"
                            type="text"
                            label="Amount of Food"
                            fullWidth
                            />
                    </Box>
                    <Box margin={2}>
                        <Field
                            component={FormikMuiTextField}
                            name="foodType"
                            type="text"
                            label="Food Type"
                            fullWidth
                            select
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            >
                            <MenuItem value="Fruits">Fruits</MenuItem>
                            <MenuItem value="Vegetables">Vegetables</MenuItem>
                            <MenuItem value="Protein">Protein</MenuItem>
                        </Field>
                    </Box>
                    <Box margin={2}>
                        <Field
                            component={FormikMuiTextField}
                            name="units"
                            type="text"
                            label="Food units (kg, g, etc.)"
                            fullWidth
                            />
                    </Box>
                    <Box margin={2}>
                        {isSubmitting && <LinearProgress />}
                    </Box>
                    <Box margin={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                            >
                            Submit
                        </Button>
                        <OpenVetCallModal cageId={cageId}></OpenVetCallModal>
                    </Box>
                </Form>
            )}
        </Formik>
        <Dialog
            open={openConfirmDialog}
            onClose={handleToggleConfirmDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Submitted Sucessfully
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleToggleConfirmDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>

        </>
    );
};

export default ZookeeperForm;
