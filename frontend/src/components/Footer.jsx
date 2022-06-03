import React from 'react'
import { Grid, Box, Container, colors, Typography, Stack, AppBar, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles'


const Footer = () => {
  const theme= useTheme()
  return (

    <AppBar
    position="fixed"
    sx={{ top: 'auto', bottom: 0  }}
    elevation={2}
    >
      {/* <Toolbar align='center'> */}
            <Typography 
                sx= {{ backgroundColor:  colors.grey[700]  }}
                // px= {{ xs: 1, sm: 3 }}
                py={{ xs: 1, sm: 0 }}
                variant="body2"
                color="black"
                align="center"
              >
                {/* {"Copyright © "} */}
                
                {/* { "Made with ❤️ by Tdmund  } */}
                { " Copyright " }

                <CopyrightOutlinedIcon  sx= {{ fontSize: '15px' }} />
                
                {new Date().getFullYear()}
                {"."}

                {"    "} { "  "} { "|  Made with "}
                {/* <FavoriteBorderOutlinedIcon  sx={{ color: colors.red[600] }} /> */}
                <FavoriteIcon sx={{ color: colors.red[400], fontSize: '20px' }} />
                {" by Tdmund. "}

                <Box align='center'>
                    <LinkedInIcon  sx={{ color: colors.blue[600] }} />
                    <TwitterIcon sx={{ color: colors.blue[600] }} />
                    <GitHubIcon />
                </Box>
            </Typography>
        {/* </Toolbar> */}
    </AppBar>
      

  )
}

export default Footer