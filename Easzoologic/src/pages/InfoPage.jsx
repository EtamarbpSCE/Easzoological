import { useState } from 'react'
import ChooseType from '../componenets/ChooseType/ChooseType'
import AnimalInfoCard from '../componenets/AnimalInfoCard/AnimalInfoCard'
import { Card, CardActionArea, Container } from '@mui/material'
import './infoPage.css'
import ZookeeperForm from '../componenets/ZookeeperForm/ZookeeperForm'
import ScanPage from '../componenets/Scanner/ScanPage'
function InfoPage({cardInfo}) {
  return (
    <>
      <div style={{display:'flex', flexDirection: 'column'}}>
        {/* <ChooseType/> */}
        {/* card */}
        {/* form */}
        {/* submit */}
        {/* Open call for vet. */}
        <Container>  
            <div className="page_container row col-12">
              <div className='info_card row'>
                <div className='col-12 justify-contnet-center'>
                  <AnimalInfoCard
                      cardInfo={cardInfo}
                  />
                </div>
              </div> 
              <div className='form_section'>
                <ZookeeperForm></ZookeeperForm>
              </div> 
              <div className='buttons_sections'>
              </div> 
            </div>
        </Container>
      </div>
    </>
  )
}

export default InfoPage
