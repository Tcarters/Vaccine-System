import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../handlers/authHandler'
import { Outlet, useNavigate } from 'react-router-dom'
import { Loading, SideBar, TopNav, Footer } from '../components'
import { Box, colors, Toolbar } from '@mui/material'


const AppLayout = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)



  useEffect ( () => {
    const checkToken = async () => {
      const res = await isAuthenticated()
      if (!res) return navigate('/login')
      setIsLoading(false)
    }
    checkToken()

  }, [])
  return (
    isLoading ? (
      <Box sx={{ width: '100%', height: '100vh' }}>
           <Loading/>
      </Box>


    ) : (    
        <Box>
          { /* top nav here */ }
          <TopNav />

          <Box sx={{ display: 'flex'}}>
            { /* sidebar here */}
            <SideBar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        backgroundColor: colors.grey['100'] ,
                        width: 'max-content'
                    }}
                >
                    <Toolbar />
                    <Outlet />
                </Box>
   
          </Box>

          <Box px={{ xs: 1, sm: 1 }}
        py={{ xs: 1, sm: 1 }}
        bgcolor="text.secondary"
        color="white"
          
          >
            my footer
            {/* <Footer/> */}
          </Box>
          
        </Box>

      
    )
    
    
  ) 
}

export default AppLayout