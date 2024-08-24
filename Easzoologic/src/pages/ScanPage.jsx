import React, { useState, useEffect } from 'react';
import QRCodeScanner from '../componenets/Scanner/QRCodeScanner';
import InfoPage from './InfoPage';
import TableData from '../componenets/DataTable/DataTable';
import TableWrapper from '../componenets/DataTable/TableWrapper';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Box, Button } from '@mui/material';
import Logo from '../assets/logo.svg'
import { Image } from '@mui/icons-material';
import api from '../constants/axios.config';


const content = 
    {   
        "1231":{
            animal: "Tigers",
            title: "Tiger Cage",
            content: "Watch out when getting inside, theres a high stair.",
            img:"https://www.moomoo.co.il/assets/img/logo/main.png"
        }
    }

function ScanPage({role}) {
    console.log(role)
    const [pageState, setPageState] = useState({
        showScanner: false,
        showInfo: false,
    })
    // const [showInfo, setShowInfo] =  (false);
    const [scannerResult, setScannerResult] = useState('');
    const [cardInfo, setCardInfo] = useState('')
    useEffect(()=>{
        console.log("yo wtf")
        const result = scannerResult ? JSON.parse(scannerResult)['details'].id : null
        console.log("result ", result)
        if(result){
            getCageDetails(result);
            setPageState(({
                showScanner: false,
                showInfo: true
            }));
            // setCardInfo({id:result, ...content[result]})
        }

    }, [scannerResult])

    const getCageDetails = async (id)=>{
        try{
            const results = await api.get('/info/cage/' + id)
            console.log(results);
            setCardInfo(results.data.rows[0])
        }catch(e){
            console.log("Error getting cage info: ", e);
        }
    }
    return (
        // <div style={{display:'flex', flexDirection: 'column' , gap:'12px', justifyContent:'center'}} className='container row col-m-12'>
        <Box sx={{ p: 2, width:{sm:'100%', l:'50%', xl:"80%"}}}>
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
            {!pageState.showInfo && 
                <Button 
                    variant="contained"
                    startIcon={<QrCodeIcon />}
                    onClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            showScanner: !prevState.showScanner
                        }));
                    }}
                    sx={{
                        margin: {
                            xs: '5px', // Margin for mobile devices
                            sm: '10px' // Margin for larger screens
                        },
                        width:{
                            xs: '90%',
                            sm: '100%'
                        }
                    }}
                    
                >
                    {pageState.showScanner ? 'Close Scanner' : 'Scan QR Code'}
                </Button>
            }
            <div className='col-1 padding-12px'>
                {pageState.showScanner && <QRCodeScanner setShowInfo={setPageState} setResult={setScannerResult}/>}
            </div>
            <div className='row'>
                <div className='col-12 '>
                    {!pageState.showScanner && !pageState.showInfo && <TableWrapper role={role}/>}
                </div>
            </div>
            {pageState.showInfo && <InfoPage role={role} scannerResult={scannerResult} cardInfo={cardInfo} setPageState={setPageState}></InfoPage>}
        </Box>
    );
}

export default ScanPage;
