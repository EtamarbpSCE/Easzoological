import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import api from '../../constants/axios.config';
import { Error } from '@mui/icons-material';


const defaultTheme = createTheme();

export default function passwordReset() {
  const [error, setError] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        const data = new FormData(event.currentTarget);
        const emailValue = data.get('email');
        console.log(emailValue.match(regex))
        if(!emailValue.match(regex)) { 
            setError(true)
            setErrorMessage("Invalid email, please re-check your email address")
            return;
        }
        const response = await api.post('auth/reset_password', {email:emailValue, reset:true});
        navigate("/password-reset-confirmation", { state: { email: emailValue } });
    } catch (e) {
        setErrorMessage("Error occured try again later.")
        setError(true)
        console.log("Error logging in", e);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Password Reset
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {error && <><Error></Error> {errorMessage} </>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Reset Password
            </Button>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}
