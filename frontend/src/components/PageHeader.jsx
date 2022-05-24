import React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack, Typography } from '@mui/material'




const PageHeader = ( props ) => {
  return (
    // <div>PageHeader</div>
    <Box  sx= {{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
        
    }} 
    >
        <Stack>
            <Typography variant='h6'>
                {props.title}
            </Typography>
        </Stack>

        { props.rightContent }
    </Box>
  )
}

PageHeader.propTypes ={
    title: PropTypes.string,
    rightContent: PropTypes.node
}

export default PageHeader