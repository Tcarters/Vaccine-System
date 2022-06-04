import React, { useEffect, useState } from 'react'
import adminApi from '../api/adminApi'
import { Stack, Grid, Card, CardContent, colors,  Box, Typography, CardHeader, Button } from '@mui/material'
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [summaryData, setSummaryData ] = useState('')

  useEffect( () => {
    const getData = async () => {
      try {
        const res = await adminApi.getSummary()
        // console.log('Ans of res',res)
        setSummaryData(res)
      }catch(err) {
        console.log('Error while get Ans:', err)
      } //end catch
    } //end function getData
    getData()
  }, [])

  // console.log('first', summaryData.totalUser )


  return (
    <Stack spacing={4}>
      <div>
          <Grid container spacing={2}>

            <Grid item xs={3}>
              <Card elevation={0}>
                <CardContent>
                  {
                    summaryData && <SummaryInfo
                      title='Total Patients'
                      number={summaryData.totalUser.toLocaleString('de-DE')}
                      icon={<PersonOutlinedIcon
                              sx={{ fontsize: '195rem' }}
                              color='warning'
                            />}
                          /> //end summaryInfo
                  }

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={3}>
              <Card elevation={0}>
                <CardContent>

                {
                    summaryData && <SummaryInfo
                      title='Patient  Vaccinated'
                      number={summaryData.userVaccinated.toLocaleString('de-DE')}
                      icon={<VerifiedUserOutlinedIcon
                              sx={{ fontsize: '100px' }}
                              color='success'
                            />}
                          /> //end summaryInfo
                  }


                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={3}>
              <Card elevation={0}>
                <CardContent>

                {
                    summaryData && <SummaryInfo
                      title='Available vaccine dose'
                      number={summaryData.availableVaccineDose.toLocaleString('de-DE')}
                      icon={<AddModeratorOutlinedIcon
                              sx={{ fontsize: '13rem' }}
                              color='primary'
                            />}
                          /> //end summaryInfo
                  }

                </CardContent>
              </Card>
            </Grid>


            <Grid item xs={3}>
              <Card elevation={0}>
                <CardContent>

                {
                    summaryData && <SummaryInfo
                      title='Total Places '
                      number={summaryData.totalPlace.toLocaleString('de-DE')}
                      icon={<RoomOutlinedIcon
                              sx={{ fontsize: '13rem' }}
                              color='error'
                            />}
                          /> //end summaryInfo
                  }

                </CardContent>
              </Card>
            </Grid>

          </Grid>
      </div>

      <div>
         <Grid container spacing={2}>
           {/* Grid for vaccination Diagram */}
                <Grid item xs={4}>

                    <Card elevation={0}>
                        <CardHeader 
                            title={
                                  <Typography variant="h6">
                                      Vaccination Diagram
                                  </Typography>}  
                        />

                        <CardContent>
                              {
                                summaryData && <VaccinatedChart chartData={summaryData.userVaccinatedAnalyst} />
                              }
                        </CardContent>
                    </Card>
                </Grid>

                {/* Vaccine lots diagram  */}

                <Grid item xs={8}>
                    <Card elevation={0}>
                        <CardHeader 
                            title={
                                  <Typography variant="h6">
                                      Latest Vaccine Lots
                                  </Typography>}  

                                  action={<Button
                                    variant='text'
                                    disableElevation
                                    component={Link}
                                    to='/admin/vaccine'
                                  >
                                    Manage vaccine
                                  </Button> }
                        />

                        <CardContent>
                             {
                               summaryData && <LatestVaccineLotTable list={summaryData.latestVaccineLot}/>
                             }
                        </CardContent>
                    </Card>
                  </Grid>

      </Grid>
      </div>

          
        {/* <Footer /> */}

      
    </Stack>
  )
}

export default Dashboard

const SummaryInfo = ({title, number, icon }) => {
  return (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }}>

      <Stack spacing={2}>

          <Typography variant='body2' fontWeight='600'>
              { title }
          </Typography>

          <Typography variant='h4' fontWeight='600'>
            { number }
          </Typography>
      </Stack>

      <div>
        { icon }
      </div>
      
    </Box>
  )
}

const VaccinatedChart = ({ chartData}) => {
  // console.log('data of props: ', chartData )

  ChartJS.register(ArcElement, Tooltip, Legend )

  const data = {
    labels: [
        `1 dose ${Math.floor(chartData.userWithOneDose / chartData.totalUser * 100 )}%`,
        `Upper 2 doses ${Math.floor(chartData.userWitAboveTwoDose / chartData.totalUser * 100)}%`,
        `0 dose ${Math.floor(chartData.userWithZeroDose / chartData.totalUser * 100)}%`
    ],
    datasets: [
      {
        label: 'Vaccination Diagram',
        data: [
          chartData.userWithOneDose,
          chartData.userWithAboveTwoDose,
          chartData.userWithZeroDose
        ],
        backgroundColor: [
            colors.yellow['600'],
            colors.purple['300'],
            colors.red['500']
        ],
        borderColor: [
          colors.yellow['200'],
          colors.purple['300'],
          colors.red['500']
        ],
        borderWidth: 1

      }
    ]
  }

  return (
      <Pie
          data={data}
          options={{
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
          }} 
    
    />
    // <>
    //  <div>
    //     VaccinatedChart
    // </div>
    // </>
   
  )
}

const LatestVaccineLotTable = ({ list }) => {
  const tableHeader = [
    {
      field: 'name', headerName: 'Vaccines Lots Available ', width: 200
    },
    {
      field: 'vaccine', headerName: 'Vaccine ', width: 200,
      // valueGetter: (params) =>  `${params.value.name}` //console.log('Me:', (params.value && `${params.value.name}`)  ),
      renderCell: (params) => {  return params.value ? `${params.value.name}` :  'Empty'} 
      //console.log(params)}
        
    },
    {
      field: 'quantity', headerName: 'Quantity ', width: 150, align: 'center',
      renderCell: (params) => { return params.value ?  params.value.quantity : 'Empty' } //.toLocalString('de-DE') : 'Empty' }

    },
    {
      field: 'createdAt', headerName: 'Time ', flex: 1,
      renderCell: (params) => moment(params.value).format('DD-MM-YYYY HH:mm:ss')
    }
]
// let  x =  { name: "Joute", p2: 'love', p3: 'dataEnd'} 
//  const fun = ( params) => {
//    return ( params.name
//   //params.forEach(element => console.log(element) )
//     ) }
//   // params.map(d => { 'Data is: ',  d } ) }
// console.log('Data of params:' , fun(x) )

return ( 
  <div>

     <DataGrid 
        autoHeight
        rows={list}
        columns={tableHeader}
        hideFooter
        density='comfortable'
        showCellRightBorder
        showColumnRightBorder
        disableSelectionOnClick

  />
  </div>
 
)
}