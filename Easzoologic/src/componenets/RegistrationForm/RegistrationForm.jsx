import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, MenuItem, TextField, Box, Typography } from '@mui/material';
import api from '../../constants/axios.config';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { CheckCircleOutline } from '@mui/icons-material';

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
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const [emailSent, setEmailSent] = useState(false);
  const [userId, setUserId] = useState(null)
  const [formValues, setFormValues] = useState({
    fullName: '',
    role: '',
    email:'',
    password:'',
  })
  const [editUser, setEditUser] = useState(null);

    const getUsers = async (id)=>{
        try{
            const response = await api.get(`info/users/${id}`)
            console.log(response)
            setEditUser(true)
            const userData = response.data.rows[0];
            setFormValues(prev => ({
                ...prev,
                fullName: userData.full_name,
                role: userData.role,
                email:userData.email,
            }))
            console.log(response.data)
        }catch(e){  
            console.log('cant retrive user ', e);
        }
    }
    useEffect(()=>{
        const searchUserId = searchParams.get('id')
        console.log(searchUserId)
        if(searchUserId){
            setUserId(searchUserId)
            getUsers(searchUserId);
        }  
    },[])

    const handleSendNewPassword = async ()=>{
        try{
            const response = await api.post(`auth/reset_password`,{email:formValues.email})
            setEmailSent(true);
        }catch(e){  
            console.log('cant send password reset ', e);
        }
    }

  const handleToggleConfirmDialog = () => {
        setOpenConfirmDialog(false)
        setPageState(prev => ({
            ...prev,
            signUp: false
        }))
  };

    const backToPanel = () => {
        navigate(-1)
    };

  return (
    <>
      <Formik
      enableReinitialize={true}
        initialValues={formValues}
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
            const path = userId ? `auth/users/${userId}` : 'auth/createUser'
            const res = await api.post(path, values);
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
            <Box>
            <div>
                <Typography variant='h2' color='primary'>{userId ?  "Edit User" : 'Add New User'}</Typography>
            </div>

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
            {userId && 
                <Box margin={2} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'5px'}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={handleSendNewPassword}
                    >
                        Send Reset Passowrd Link.
                        
                    </Button>
                    {emailSent ? 
                        (
                            <>
                                <CheckCircleOutline sx={{color:'green'}} />
                            </>
                        ) 
                        : null
                    }
                </Box>
            }
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
                <MenuItem value="1">Admin</MenuItem>
                <MenuItem value="3">Zoo Keeper</MenuItem>
                <MenuItem value="2">Veterinarian</MenuItem>
              </Field>
            </Box>
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
                    onClick={submitForm}
                >
                    Submit
                </Button>
                </Box>
          </Form>
          </Box>
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
