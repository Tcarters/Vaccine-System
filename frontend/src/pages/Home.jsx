import React from 'react'
import { Box, Card, colors, TextField, Typography, Button } from '@mui/material'
import { Footer } from '../components'
import bgImage from '../assets/images/vac.jpg'
import { useNavigate, Link, useLocation } from 'react-router-dom'


import { LoadingButton } from '@mui/lab'


const Home = () => {
  return (
    <div>

      <Typography variant='h1' 
                  alignContent='center' 
                  align='center' 
                  fontSize={'40px'} 
                  position='relative'
        sx={{ m:1 }}
      >
        Welcome Back Admin
      </Typography>


        <Box
      sx={{
          height: '90vh',
          width: '200',
          display: 'flex',
          justifyContent: 'flex-start',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right',
          // backgroundColor: 'green'
      }}
    >

      <Card sx={ {
          width: '110%',
          maxWidth: '700px'
        }}>

          <Typography variant='h2' align='center' color='lightblue' 
          fontSize={'110px'}
          sx={{ m: 4, color: colors.lightBlue['800']}}
          >
                      Prevent Better  Than Cure

          </Typography>
            { "  "}
            { "  "}
            {"    "}
          <Typography variant='body' 
                      fontSize={'180'}
                      sx={{m:11, p:4, 
                      color: colors.lightBlue['700']}}>
            
             Provide proper protection for relatives and the people around you.

          </Typography>

          { " "}

          <Box sx={{ m:10, p:2 }} fontSize={'20px'}>
              Admin go there  make a round to your Space. 
                    <LoadingButton
                                variant='contained'
                                component={Link}
                                size='large'
                                to='/login'
                                sx={{backgroundColor: colors.yellow['800'],
                                marginTop: '1rem ' }}
                                // backgroundColor={ colors.deepOrange['300']}
                            >
                                Login Space
                            </LoadingButton>

                            </Box>




      </Card>
    </Box>


          <Footer />

    </div>
  )
}

export default Home