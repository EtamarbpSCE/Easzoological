import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import TableWrapper from '../../componenets/DataTable/TableWrapper';
import Logo from '../../assets/logo.svg'
import AdminTables from '../../componenets/DataTable/AdminTables';
import SignupForm from '../../componenets/RegistrationForm/RegistrationForm';

const content = 
    {   
        "1231":{
            animal: "Tigers",
            title: "Tiger Cage",
            content: "Watch out when getting inside, theres a high stair.",
            img:"https://www.moomoo.co.il/assets/img/logo/main.png"
        }
    }

function AdminPage() {
    const [pageState, setPageState] = useState({
        signUp: false,
        showInfo: false,
    })
    
    const handleRegisterUser = () => {
        setPageState(prev => ({
            ...prev,
            signUp: !pageState.signUp
        }))
        // Logic for registering a user
        console.log('Register User button clicked');
    };

    const handleCreateCage = () => {
        // Logic for creating a new cage
        console.log('Create New Cage button clicked');
    };
    // const [showInfo, setShowInfo] =  (false);
    return (
        // <div style={{display:'flex', flexDirection: 'column' , gap:'12px', justifyContent:'center'}} className='container row col-m-12'>
        <Box sx={{ p: 2, width: { sm: '100%', l: '50%', xl: '80%' } }}>
        <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{
                height: { xs: '60%', sm: '40%', md: '20%' }, // Responsive heights
                width: { xs: '60%', sm: '40%', md: '20%' },  // Responsive widths
                maxWidth: '100%', // Ensures image doesn't overflow
                maxHeight: '100%' // Ensures image doesn't overflow
            }}
        />
        <Box sx={{ my: 2, textAlign: 'center' }}>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleRegisterUser} 
                sx={{ mr: 2 }}
            >
                Register User
            </Button>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleCreateCage}
            >
                Create New Cage
            </Button>
        </Box>
        <Box sx={{ my: 2 }}>
           {!pageState.signUp && <AdminTables /> }
        </Box>
        {pageState.signUp && <SignupForm setPageState={setPageState} pageState={pageState}></SignupForm>}
    </Box>
    );
}

export default AdminPage;
