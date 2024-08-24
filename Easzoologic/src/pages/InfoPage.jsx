import { useState } from 'react'
import ChooseType from '../componenets/ChooseType/ChooseType'
import AnimalInfoCard from '../componenets/AnimalInfoCard/AnimalInfoCard'
import { Button, Card, CardActionArea, Container } from '@mui/material'
import './infoPage.css'
import ZookeeperForm from '../componenets/ZookeeperForm/ZookeeperForm'
import ScanPage from './ScanPage'
import Vetform from '../componenets/VetForm/Vetform'

function InfoPage({role, cardInfo, setPageState}) {

  return (
    <>
      <div style={{display:'flex', flexDirection: 'column'}}>
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
                {/* role based form */}

                {role == 3 && <ZookeeperForm cageId={cardInfo.id}></ZookeeperForm>}
                {role == 2 && <Vetform cageId={cardInfo.id}></Vetform>}
              </div> 
              <div className='buttons_sections'>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={()=>{
                        setPageState({
                            infoPage:false,
                        })}
                    }
                >Go back to main page</Button>
              </div> 
            </div>
        </Container>
      </div>
    </>
  )
}

export default InfoPage
