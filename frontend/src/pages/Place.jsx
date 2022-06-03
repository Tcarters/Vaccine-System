import { useEffect, useState} from 'react'
import { PageHeader } from '../components'
import placeApi from '../api/placeApi'
import { DataGrid } from '@mui/x-data-grid'
import { Button, CardContent, Card, Paper } from '@mui/material' 
import { Link } from 'react-router-dom'

const Place = () => {
    const [placeList, setPlaceList] = useState([])
    const [pageSize, setPageSize] = useState(9)

    useEffect( () => {
        const getPlaces = async() => {
            try {
                const  res = await placeApi.getAll()
                console.log('Got res:', res )
                setPlaceList(res)
            } catch (err) {
                console.log('Error gotALL places:', err)
            }
        }
        getPlaces()
    }, [])

    const tableHeader = [
        {
            field: 'name', headerName: 'Place Name', width: 250,
            renderCell: (params) => (
                 <Button
                        variant='text'
                        component={Link}
                        to={`/admin/place/${params.row.id}`}
                  >
                        { params.value }
                 </Button> 
            )
        }, 

        {
            field: 'creator', headerName: 'Visited by ', width: 220,
            renderCell: (params) => (
                <Button
                    variant='text'
                    component={Link}
                    to={`/admin/patients/${params.value._id}` }
                >
                    { params.value.fullName ?? "No Information " }

                </Button>
            )
        }, 

        {
            field: 'userVisitLast24h', headerName: 'Patient Visited in Last 24h', width: 220, align: 'center',
            renderCell: (params) => { return params.value ? params.value.length : 'NONE' }
             
        },

        {
            field: 'address', headerName: 'Address', flex: 1,
            // renderCell: (params)
        }
    ]


  return (
        <>
            <PageHeader title='HOSPITAL LIST'/>

            <Paper elevation={0}>
                 <DataGrid
                        autoHeight
                        rows={placeList}
                        columns={tableHeader}
                        pageSize={ pageSize}
                        OnPageSizeChange={ (size) => setPageSize(size) }
                        rowsPerPageOptions={[9, 50, 100]}
                        showColumnRightBorder
                        showCellRightBorder
                        disableSelectionOnClick
                />

            </Paper>
        </>
  )
}

export default Place