import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, MenuItem, TextField, Box } from '@mui/material';
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

const SignupForm = ({setPageState, pageState}) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState({show:false, message:"Submission done"});

  const handleToggleConfirmDialog = () => {
        setOpenConfirmDialog(false)
        setPageState(prev => ({
            ...prev,
            signUp: false
        }))
  };

  return (
    <>
      <Formik
        initialValues={{
          fullName: '',
          role: '',
          email:'',
          password:'',
        }}
        validate={values => {
          const errors = {};
          if (!values.fullName) {
            errors.fullName = 'Required';
          }
          if (!values.role) {
            errors.role = 'Required';
          }
          if (!values.role) {
            errors.role = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await api.post('/auth/createUser', values);
            setSubmitting(false);
            console.log("res.code", res)
            if(res.data.code === 1){
                setOpenConfirmDialog(prev => ({message:'User already exists.', show:true}));
                return;
            }
            setOpenConfirmDialog(prev => ({...prev, show:true}));
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
                name="fullName"
                type="text"
                label="Full Name"
                fullWidth
                required
              />
            </Box>
            <Box margin={2}>
              <Field
                component={FormikMuiTextField}
                name="email"
                type="text"
                label="Email Adress"
                fullWidth
                required
              />
            </Box>
            <Box margin={2}>
              <Field
                component={FormikMuiTextField}
                name="role"
                type="text"
                label="Role"
                fullWidth
                select
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              >
                <MenuItem value="3">Admin</MenuItem>
                <MenuItem value="2">Zoo Keeper</MenuItem>
                <MenuItem value="1">Veterinarian</MenuItem>
              </Field>
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
    </>
  );
};

export default SignupForm;
