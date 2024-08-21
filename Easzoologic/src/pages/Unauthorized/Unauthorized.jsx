import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // Navigate back to the previous page
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
      textAlign="center"
    >
      <Typography variant="h3" color="error" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        You do not have permission to view this page.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default UnauthorizedPage;
