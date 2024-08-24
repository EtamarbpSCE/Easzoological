import React, { useEffect, useState } from 'react';
import { useZxing } from "react-zxing";

const QRCodeScanner = ({setResult, setShowInfo}) => {

    const {
      ref,
    } = useZxing({
      onDecodeResult(result) {
        setResult(result.getText());
        // setShowInfo(prev => ({...prev, showScanner: false}))
        // setShowInfo(true)
        console.log(result.getText())
      },
    //   onDecodeError(error){
    //     console.log("ERROR!!! ,", error)
    //   }
    });
  
    return (
      <>
        <video ref={ref} style={{width:'60vw', height: '60vh'}} />
      </>
    );
}

export default QRCodeScanner;
