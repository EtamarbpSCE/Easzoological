import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useSearchParams } from "react-router-dom";
import api from '../../constants/axios.config';
// import jwtDecode from 'jwt-decode';
import LinearProgress from '@mui/material/LinearProgress';
import { Error } from '@mui/icons-material';
import logo from '../../assets/logo.svg'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const defaultTheme = createTheme();

export default function ForgotPassword({ setUserState }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isNew, setIsNew] = useState(true); // Assuming we are handling a new user by default
    const [stage, setStage] = useState(1); // Tracks the current stage
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [openConfirmDialog, setOpenConfirmDialog] = useState({show:false, message:"Submission done"});
    const [password, setPassword] = useState('');
    const [cantSubmit, setCantSubmit] = useState(true);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({
        length:false,
        capital:false,
        lowerCase:false,
        digits: false,
        special:false

    });
    const navigate = useNavigate();

    const invalidToken = ()=>{
        setOpenConfirmDialog({show:true, message:"Somthing wrong with the token, redirecting to login."})
        setTimeout(()=>{
            navigate('/login')
        }, 3000);
    }


    useEffect(()=>{
        if(!searchParams.get('token')){
            invalidToken();
        }
    },[])
    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        const token = searchParams.get('token');
        const data = {email, token};
        const response = await api.post('auth/get_registration_token', data);
        const isValid = response.data.code;

        if(isValid == 1) {
            invalidToken();
            return;
        }
        setStage(2); // Move to the next stage
    };

    const handlePasswordState = (field, state)=>{
        setPasswordStrength(prev => ({
            ...prev,
            [field]:state
        }))
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        setError(false)
        // Calculate password strength (simple example)
        let strength = 0;
        if (value.length >= 8) { handlePasswordState('length', true) } else { handlePasswordState('length', false) }
        if (/[A-Z]/.test(value)) { handlePasswordState('capital', true) } else { handlePasswordState('capital', false) }
        if (/[a-z]/.test(value)) { handlePasswordState('lowerCase', true) } else { handlePasswordState('lowerCase', false) }
        if (/[0-9]/.test(value)) { handlePasswordState('digits', true) } else { handlePasswordState('digits', false) }
        if (/[\W]/.test(value)) { handlePasswordState('special', true) } else { handlePasswordState('special', false) }

    
        // setPasswordStrength(strength);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event.currentTarget)
        const isTrue = Object.keys(passwordStrength).filter(criteria => passwordStrength[criteria] != true);
        console.log(isTrue)
        if(isTrue.length === 0){
            setCantSubmit(false);
        }
        if(cantSubmit){
            setError(
                'Cant create new password, the password must fullfill the needs of a strong password.'
            )
            return;
        }

        if (isNew && stage === 2) {
        // Handle the new user registration process here
            if (password !== passwordConfirm) {
                alert("Passwords do not match!");
                return;
            }
            try {
                console.log("WHJATS")
                const data = {email, password};
                const response = await api.post('auth/signup', data);
                setOpenConfirmDialog({show:true, message:"Registered succesfully, you are being re directed to login"})
                setTimeout(()=>{
                    navigate('/login')
                }, 3000);
            } catch (e) {
                console.log("Error logging in", e);
            }
            // Submit the email and password for registration
        } else {

        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <Dialog
                open={openConfirmDialog.show}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Confirm Action'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {openConfirmDialog.message}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            {/* <Avatar sx={{ m: 1 }}> */}
                <img src={logo}/>
            {/* </Avatar> */}
            <Typography component="h1" variant="h5">
                {isNew ? "Sign Up" : "Sign In"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                {isNew && stage === 1 && (
                <>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleEmailSubmit}
                    >
                    Next
                    </Button>
                </>
                )}

                {isNew && stage === 2 && (
                <>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                    />
                    {/* <LinearProgress
                    variant="determinate"
                    value={passwordStrength}
                    sx={{ height: 10, borderRadius: 5, mt: 1, mb: 2 }}
                    /> */}
                    <Box sx={{textAlign:'left', fontWeight:'bold'}}>
                        <Typography sx={{color: passwordStrength.length ? 'green' : null, fontWeight:'bold'}}>
                            Password must be 8 charcters long
                        </Typography>
                        <Typography sx={{color: passwordStrength.digits ? 'green' : null, fontWeight:'bold'}}>
                            Password must have digits. 
                        </Typography>
                        <Typography sx={{color: passwordStrength.lowerCase ? 'green' : null, fontWeight:'bold'}}>
                            Password must have lower case charcters
                        </Typography>
                        <Typography sx={{color: passwordStrength.capital ? 'green' : null, fontWeight:'bold'}}>
                            Password must have Camel case letters.
                        </Typography>
                        <Typography sx={{color: passwordStrength.special ? 'green' : null, fontWeight:'bold'}}>
                            Password must have special charcter (!, %, @, &, etc.)
                        </Typography>
                    </Box>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="passwordConfirm"
                        label="Confirm Password"
                        type="password"
                        id="passwordConfirm"
                        autoComplete="new-password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <Typography sx={{minHeight:'50px'}}>
                        {error && (<><div style={{display:'flex', flexDirection:'row', color:'red', fontWeight:'500'}}><Error/> {error} </div></>)}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </>
                )}
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}