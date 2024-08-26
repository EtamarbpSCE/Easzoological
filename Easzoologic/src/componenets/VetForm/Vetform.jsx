import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, MenuItem, TextField, Box, Typography } from '@mui/material';
import CheckHistoryModal from '../CheckHistoryModal/CheckHistoryModal';
import api from '../../constants/axios.config';

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



const Vetform = ({ cageId }) => {

    const [animalNames, setAnimalsNames] = useState([]);


    const getAnimalsName = async () => {
        try{

            const results = await api.get(`/info/cage_animals/${cageId}`)
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
        <Formik
            initialValues={{
                animal: '',
                treatment: '',
                extraInfo: '',
                cageId: cageId
            }}
            validate={values => {
                const errors = {};
                if (!values.animal) {
                    errors.animal = 'Required';
                }
                if (!values.treatment) {
                    errors.treatment = 'Required';
                }
                if (!values.extraInfo) {
                    errors.extraInfo = 'Required';
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
                    <Typography variant="h6" gutterBottom>
                        Vet Form
                    </Typography>
                    <Box margin={2}>
                        <Field
                            component={FormikMuiTextField}
                            name="animal"
                            type="text"
                            label="Select Animal"
                            fullWidth
                            select
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        >
                            {animalNames?.map(element => 
                                <MenuItem value={element.value}>{element.label}</MenuItem>
                            )}
                            {/* <MenuItem value="Cat">Cat</MenuItem>
                            <MenuItem value="Rabbit">Rabbit</MenuItem> */}
                        </Field>
                    </Box>
                    <Box margin={2}>
                        <Field
                            component={FormikMuiTextField}
                            name="treatment"
                            type="text"
                            label="Treatment Title"
                            fullWidth
                        />
                    </Box>
                    <Box margin={2}>
                        <Field
                            component={FormikMuiTextField}
                            name="extraInfo"
                            type="text"
                            label="Extra Information"
                            fullWidth
                            multiline
                            rows={4}
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                        <CheckHistoryModal cageId={cageId} />
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default Vetform;
