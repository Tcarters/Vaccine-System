import React from 'react'
import { Box, CircularProgress } from '@mui/material'


const Loading = () => {
  return (
    // <div>Loading</div>
    <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%'
    }}>
        <CircularProgress/>

    </Box>
  )
}

export default Loading