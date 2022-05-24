import React from 'react'
import { Box } from '@mui/material'

const Home = () => {
  return (
    <div>

        <h1> Welcome Home Page </h1>
      Home

      <Box px={{ xs: 1, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
          
          >
            my footer
            {/* <Footer/> */}
          </Box>

    </div>
  )
}

export default Home