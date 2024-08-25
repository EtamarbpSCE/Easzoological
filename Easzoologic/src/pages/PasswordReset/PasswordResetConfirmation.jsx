import * as React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

export default function PasswordResetConfirmation({ email }) {
    const navigate = useNavigate()
    const {state} = useLocation();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Password Reset
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          A password reset email has been sent to <strong>{state.email}</strong>.
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Please check your inbox and follow the instructions to reset your password.
        </Typography>
        <br></br>
        <Button variant='outlined' color='primary' onClick={()=>{navigate('/login')}}>
            Go back to Login page
        </Button>
      </Box>
    </Container>
  );
}
