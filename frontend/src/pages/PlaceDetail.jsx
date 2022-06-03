import React, { useEffect, useState } from 'react'
import placeApi from '../api/placeApi'
import { PageHeader } from '../components'
import { useParams, Link } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import QRCode from 'react-qr-code'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid'

const PlaceDetail = () => {
    const { id } = useParams()
    const [place, setPlace] = useState()
    const [pageSize, setPageSize] = useState(9)

    useEffect( () => {
        const getPlace = async() => {
            try {
                const res = await placeApi.getOne(id)
                setPlace(res)

            } catch(err) {
                console.log('Got ErrorPlace:', err)
            }
        }

        getPlace()
    }, [])
    
    const tableHeader = [
        {
            field: 'name', headerName: 'Name', width: 200,
            renderCell: (params) => {  return  params ? `${params.row.user.fullName}` : 'NaN'}
        },

        {
            field: 'phone', headerName: 'Phone', width: 150, align: 'center',
            renderCell: (params) => { return params ? params.row.user.phoneNumber : 'NaN' }
        },

        {
            field: 'address', headerName: 'Location', width: 150, align: 'center',
            renderCell: (params) => { return params ? params.row.user.address : ' NaN ' }
        },

        {
            field: 'createdAt', headerName: 'Time', flex: 1,
            renderCell: (params) => moment(params.value).format('DD-MM-YYYY HH:mm:ss')
        }
    ]

  return (
    <>
        <PageHeader title='Place detail'/>
        <Grid container spacing={4}>
            <Grid item xs={4}>
                    <Card elevation={0}>
                        <CardContent>
                            {
                                place && 
                                <Stack spacing={2} >
                                    <div>
                                        <Typography variant='body2'>
                                            Name
                                        </Typography>

                                        <Typography variant='h6'>
                                            { place.name }
                                        </Typography>

                                    </div>

                                    <div>
                                        <Typography variant='body2'>
                                            Address
                                        </Typography>

                                        <Typography variant='h6'>
                                            { place.address }
                                        </Typography>

                                    </div>

                                    <div>
                                        <Typography variant='body2'>
                                            Visited by
                                        </Typography>

                                        <Button
                                            variant='text'
                                            component={Link}
                                            to={`/admin/patients/${place.creator.id}`}
                                        >
                                            { place.creator.fullName}

                                        </Button>

                                    </div>

                                </Stack>
                            }

                        </CardContent>
                    </Card>

                    <Card elevation={0}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {
                                    place && 
                                    <QRCode id='place-qr' value='place._id' size={235} level='H' />
                                }
                            </Box>
                        </CardContent>
                        
                    </Card>

            </Grid>

            <Grid item xs={8}>
                <Card elevation={0}>
                    <CardHeader
                        title={
                            <Typography variant='h6'>
                                Patient Visited in Last 24h
                            </Typography>
                        }
                    />

                    <CardContent >
                        {
                            place && <DataGrid 
                                            autoHeight
                                            rows={place.userVisitLast24h}
                                            columns={tableHeader}
                                            pageSize={pageSize}
                                            onPageSizeChange={ (size) => setPageSize(size) }
                                            rowsPerPageOptions={[9, 50, 100]}
                                            density='comfortable'
                                            showCellRightBorder
                                            showColumnRightBorder
                                            disableSelectionOnClick
                            />
                        }
                    </CardContent>
                </Card>

            </Grid>
        </Grid>

    </>
  )
}

export default PlaceDetail