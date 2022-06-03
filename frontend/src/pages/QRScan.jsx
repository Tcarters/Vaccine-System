import React, { useEffect, useState, } from 'react'
import userApi from '../api/userApi'
import  QrReader  from 'react-qr-reader'

import { PageHeader } from '../components'
import { Button, Card, CardContent, CardHeader, 
         FormControl, Grid, Stack, 
         TextField, Typography, CardActions } from '@mui/material'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid'
import { useParams } from 'react-router-dom'



const QRScan = () => {
    const { id } = useParams()
    const [onLoadPatient, setOnLoadPatient] = useState(false)
    const [patient, setPatient] = useState()

    const handleErr = (er) => {
        console.log('Got Err:', er)

    }
           


            
         const handleScan = async(data) => {
                    if (onLoadPatient) return
                    if (!data) return

                    try {
                        setOnLoadPatient(true)
                        const res = await userApi.getOne(data)
                        console.log('Ans:', res)
                        setPatient(res)

                    } catch(err) {
                        console.log('Err', err)
                    } finally {
                        setOnLoadPatient(false)
                    }

             }


    useEffect ( () => {
                    
                // handleScan(1)
                console.log('Dataaaa')
     }, [])


// console.log('Got id', id)
    // useEffect ( () => {
    //      const handleScan = async () => {
    //          try{ 
                 
    //             // const res = await userApi.getAll()
    //             const res2 = await userApi.getOne(id)
    //             console.log('ANs', res2 )
                 
    //          }
    //             catch(err){
    //                 console.log('Err', err)
    //             }
    //      }
    //      handleScan()
    // }, [])
   


  return (
    <>
        <PageHeader title='Scan Patient QR' />
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Card elevation={0}>
                    <CardContent>
                        <QrReader 
                            delay={300}
                            onError={handleErr}
                            onScan={handleScan}
                            style={{width: '120%' }} 
                            // , height: '300px'}}
                            // facingmode='user'
                        />
                    </CardContent>

                    <CardActions>
                        <Button variant='contained'
                                disableElevation
                                onClick={() => setPatient(null)}
                        >
                            Reset 
                        </Button>
                    </CardActions>
                </Card>

            </Grid>

            <Grid item xs={9}>
                <Stack spacing={4}>
                    <Card elevation={0}>
                        <CardHeader 
                            title={
                                <Typography variant ='h6'>
                                    Patient Info
                                </Typography>
                            }
                        />

                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <FormControl>
                                        {
                                            patient && 
                                                <TextField
                                                    label='Id Card'
                                                    variant='outlined'
                                                    value={patient.idNumber}
                                                    InputProps={{ readOnly: true }}

                                                />
                                        }
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl>
                                        {
                                            patient && 
                                                <TextField
                                                    label='FullName'
                                                    variant='outlined'
                                                    value={patient.fullName}
                                                    InputProps={{ readOnly: true }}
                                                />
                                        }
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl>
                                        {
                                            patient && 
                                                <TextField
                                                    label='Phone'
                                                    variant='outlined'
                                                    value={patient.phoneNumber}
                                                    InputProps={{ readOnly: true }}
                                                />
                                        }
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl>
                                        {
                                            patient && 
                                                <TextField
                                                    label='Address'
                                                    variant='outlined'
                                                    value={patient.address}
                                                    InputProps={{ readOnly: true }}
                                                />
                                        }
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>

                    <Card elevation={0}>
                        <CardHeader title={
                                <Typography variant='h6'>
                                    Vaccinated Information 
                                </Typography>
                        }
                        />
                        <CardContent>
                            {
                                patient && <PatientVaccinated vaccinatedList={patient.vaccinated}/>
                            }
                        </CardContent>

                    </Card>

                </Stack>

            </Grid>

        </Grid>
        QRScan

    </>
  )
}

export default QRScan

const PatientVaccinated = ({vaccinatedList}) => {
    const tableHeader = [
        {
            field: 'vaccine', headerName: 'Vaccine', width: 200,
            renderCell: (params) => params.value.name
        },

        {
            field: 'vaccineLot', headerName: 'Vaccine Lot', width: 200, align: 'center',
            renderCell: (params) => params.value.name
        },

        {
            field: 'createdAt', headerName: 'Time', flex: 1, align: 'center',
            renderCell: (params) => moment(params.value).format('DD-MM-YYYY HH:mm:ss')
        },


    ]
    return (
       <DataGrid 
            autoHeight
            rows={vaccinatedList}
            columns={tableHeader}
            pageSize= { 6}
            rowsPerPageOptions= {[6]} //{ (size) => setPageSize(size) }
            density='comfortable'
            showCellRightBorder
            showColumnRightBorder
       />
    )
}