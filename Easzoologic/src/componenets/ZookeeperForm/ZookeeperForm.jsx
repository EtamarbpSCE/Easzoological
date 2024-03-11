import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, MenuItem, TextField, Box } from '@mui/material';
import OpenVetCallModal from '../OpenVetCallModal/OpenVetCallModal';

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

const ZookeeperForm = () => {
    return (
        <Formik
            initialValues={{
                amount: '',
                foodType: '',
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
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
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
                        {/* <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Open Vet Call
                        </Button> */}
                        <OpenVetCallModal></OpenVetCallModal>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default ZookeeperForm;
