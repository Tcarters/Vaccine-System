import React from 'react'
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined'
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import { useTheme } from '@mui/material/styles'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { logout } from '../handlers/authHandler'
import avtImage from '../assets/images/noAvatar.png'
import { AppBar, colors, IconButton, Stack, Toolbar, Typography, Avatar } from '@mui/material'


const TopNav = () => {
    const theme = useTheme()

    const navigate = useNavigate()

  return (
      <AppBar
            position="fixed"
            sx={{
                backgroundColor: colors.common.white,
                color: colors.common.black,
                zIndex: theme.zIndex.drawer + 1,
                // yIndex: theme.yIndex.drawer + 1 ,
                boxShadow: '0px 1px 4px 1px rgb(0 0 0 / 12%)'
            }}
            elevation={0}
            > 
                <Toolbar>
                    <VaccinesOutlinedIcon
                        // component={Link} 
                        sx={{
                        color: colors.red['900'],
                        marginRight: '10px'
                    }} />

                    <Typography
                        variant="h6"
                        component='div'
                        sx={{ flexGrow: 1}}
                        >

                            VACCINE MANAGEMENT SYSTEM
                    </Typography>

                    <Stack
                        direction='row'
                        spacing={2}
                        alignItems='center'
                    >
                        <Avatar
                            alt="User image"
                            src={avtImage}
                            sx={{ height: '30px', width: '30px' }}
                            component={Link}
                            to="/admin/profile"
                            />
                        <IconButton
                            aria-label='logout'
                            sx={{ color: colors.blue['800']}}
                            component={Link}
                            to="/login"
                            onClick={ () => logout(navigate) }
                        >

                            <ExitToAppOutlinedIcon/>

                        </IconButton>


                    </Stack>

                </Toolbar>
            </AppBar>
    // <div>TopNav</div>
  )
}

export default TopNav