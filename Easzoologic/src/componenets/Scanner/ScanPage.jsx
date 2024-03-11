import React, { useState, useEffect } from 'react';
import QRCodeScanner from './QRCodeScanner';
import InfoPage from '../../pages/InfoPage';

const content = 
    {   
        "1231":{
            animal: "iguana",
            title: "חצר האיגואנות",
            content: "יש כאן 13 סוגים שונים של איגואנות, נא לשים לבד",
            img:"https://www.moomoo.co.il/assets/img/logo/main.png"
        }
    }

function ScanPage() {
    const [showScanner, setShowScanner] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [scannerResult, setScannerResult] = useState();
    const [cardInfo, setCardInfo] = useState('')
    useEffect(()=>{
        // console.log(JSON.parse(scannerResult));
        console.log("scannerResult", scannerResult)
        const result = scannerResult ? JSON.parse(scannerResult)['details'].id : null
        console.log("result", content[result])
        if(result && content[result]){
            setShowInfo(true);
            setCardInfo(content[result])
        }

    }, scannerResult)
    console.log(showInfo)
    return (
        <div style={{display:'flex', flexDirection: 'column'}}>
            {!showInfo && <button onClick={() => setShowScanner(!showScanner)} >
                    {showScanner ? 'Close Scanner' : 'Scan QR Code'}
                </button>
            }
            {showScanner && <QRCodeScanner setShowInfo={setShowInfo} setResult={setScannerResult} setShowScanner={setShowScanner} />}
            {showInfo && <InfoPage cardInfo={cardInfo} ></InfoPage>}

        </div>
    );
}

export default ScanPage;
