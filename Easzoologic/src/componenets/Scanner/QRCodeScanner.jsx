import React, { useEffect, useState } from 'react';
import { useZxing } from "react-zxing";

const QRCodeScanner = ({setShowScanner, setResult, setShowInfo}) => {

    const {
      ref,
    } = useZxing({
      onDecodeResult(result) {
        setResult(result.getText());
        setShowScanner(false)
        // setShowInfo(true)
        console.log(result.getText())
      },
    });
  
    return (
      <>
        <video ref={ref} style={{width:'60vw', height: '60vh'}} />
      </>
    );
}

export default QRCodeScanner;
