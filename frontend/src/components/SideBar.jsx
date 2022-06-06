import React, {useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import { Drawer, Toolbar, colors,  List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const sideBarItems = [
    {
        text: 'Dashboard',
        path: '/admin/dashboard',
        icon: <DashboardOutlinedIcon/>
    },
    {
        text: 'Patients',
        path: '/admin/patients',
        icon: <PersonOutlinedIcon/>
    },
    {
        text: 'Place',
        path: '/admin/place',
        icon: <PlaceOutlinedIcon />
    },
    {
        text: 'Vaccine',
        path: '/admin/vaccine',
        icon: <HealthAndSafetyOutlinedIcon/>
    },
    {
        text: 'QR Scanner',
        path: '/admin/qr-scan',
        icon: <QrCodeScannerOutlinedIcon/>
    }
]

const SideBar = () => {
    const location = useLocation()
    const sideBarWidth = 240
    const [activeIndex, setActiveIndex] = useState(0)


    useEffect( () => {
        const activeItem = sideBarItems.findIndex( 
            item => window.location.pathname.split('/')[1] === item.path.split('/')[1] )
        setActiveIndex(activeItem)
    }, [location])

  return (
      <Drawer
            container={window.document.body}
            variant='permanent'
            // backgroundColor={colors.red['500']}
            
            sx={{
                width: sideBarWidth,
                // backgroundColor: colors.blue['800'],
                height: '100vh',
                boxShadow: '0px 1px 4px 1px rgb(0 0 0 / 12%)',
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: sideBarWidth,
                    backgroundColor: colors.yellow['800'],
                    borderRight: 0,
                
                }
            }}
            open={ true }
      >

          <Toolbar/>
          <List>
            {
                sideBarItems.map( (item, index) => (
                    <ListItemButton
                        key={`siderbar-key-${index}`}
                        selected={index === activeIndex }
                        component={Link}
                        to={item.path}
                        sx= {{
                            width: 'calc(100% - 20px)',
                            margin: '5px auto',
                            borderRadius: '10px',
                            '&.Mui-selected': {
                                // backgroundColor: 'green',
                                color: colors.blue['A900']
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: colors.blue['300'],
                                // '&&.hover': {
                                //     backgroundColor: 'green'
                                // }
                            }
                        }}
                    >
                        <ListItemIcon sx={{
                            color: index === activeIndex && colors.blue['A700'],
                            // fontWeight: '800'

                            // width: '450'
                        }}>
                            { item.icon }

                        </ListItemIcon>
                        
                        <ListItemText
                                primary={item.text}
                                sx={{
                                    '& span' : {
                                        fontWeight: index === activeIndex && '500'
                                    },
                                    // backgroundColor: colors.brown[400]
                                }}
                        />
                    </ListItemButton>
                     
                ))
            }
          </List>
      </Drawer>

    // <div>SideBar</div>
  )
}

export default SideBar