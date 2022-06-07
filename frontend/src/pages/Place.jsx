import { useEffect, useState} from 'react'
import placeApi from '../api/placeApi'
import userApi from '../api/userApi';
import { DataGrid } from '@mui/x-data-grid'
import { Button,Box, FormControl,TextField, CardContent, Card, Paper } from '@mui/material' 
import { CustomDialog, PageHeader } from '../components'
import { LoadingButton } from '@mui/lab'


import { Link } from 'react-router-dom'

const Place = () => {
    const [placeList, setPlaceList] = useState([])
    const [getlist, setGetList] = useState([])
    const [pageSize, setPageSize] = useState(9)
    const [showCreateModel, setShowCreateModel] = useState(false)


    useEffect( () => {
        const getPlaces = async() => {
            try {
                const  res = await placeApi.getAll()
                // console.log('Got res:', res )
                setPlaceList(res)
            } catch (err) {
                console.log('Error gotALL places:', err)
            }
        }
        getPlaces()
    }, [])

    // useEffect ( () => {
    //     const getPatientAdd = async() => {
    //         try {
    //             const res = await userApi.getAll()
    //                 console.log('Address list', res )
    //                 setGetList[res]

    //         } catch ( err) {
    //             console.log('Error got Patient Address')
    //         }
    //     }
    //     getPatientAdd()
    // }, [])



    const tableHeader = [
        {
            field: 'name', headerName: 'Place Name', width: 250,
            renderCell: (params) => (
                 <Button
                        variant='text'
                        component={Link}
                        to={`/admin/place/${params.row._id}`}
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

    // const tableHeader2 = [
    //     { 
    //         field: 'address', headerName: 'Place Name', width: 250

    //     },
    //     {
    //         field: 'fullName', headerName: 'Full Name', width: 220
    //       },

    //       {
    //         field: 'idNumber',
    //         headerName: 'ID Card',
    //         renderCell: (params) => {
    //                 <Button 
    //                     variant='text' 
    //                     component={Link} 
    //                     to={`${params.row.id}`}
    //                 >
    //                      { params.value}
    //                 </Button>
    //          }
    //       },
    //       {
    //         field: 'fullName', headerName: 'Full Name', width: 220
    //       },
    //       {
    //         field: 'phoneNumber', headerName: 'Phone Number', width: 170
    //       },
    //       {
    //         field: 'vaccine',
    //         headerName: 'Patient vaccination  Status',
    //         width: 220,
    //         renderCell: (params) => <Box
    //                 sx={{ display: 'flex', alignItems: 'center' }}
    //                 color={params.value.length > 1 ? 'green' : params.value.length === 1 ? 'orange' : ' red' }
            
    //         >
    //                   {
    //                     params.value.length > 1 && <VerifiedUserIcon/>
    //                   }
    //                   {
    //                     params.value.length === 1 && <ShieldOutlinedIcon/>
    //                   }
    //                   {
    //                     params.value.length < 1 && <ErrorOutlineOutlinedIcon/>
    //                   }
      
    //                   <Typography
    //                         variant='body2'
    //                         sx={{ marginLeft: '10px', fontWeight: '500' }}
    //                   >
    //                         Vaccinated with { params.value.length } dose { params.value.length > 1 && 's'}
    //                   </Typography>
    //               </Box>
    //       },
      
    //       {
    //         field: 'address', headerName: 'Location ', flex: 1
    //       },
    //       {
    //         field: 'id',
    //         headerName: 'Actions',
    //         width: 170,
    //         renderCell: (params) => <Button
    //                       variant='text'
    //                       component={Link}
    //                       to={`${params.value}`}
    //                       startIcon={<OpenInNewOutlinedIcon/>}
    //         >
    //           Detail 
      
    //         </Button>
    //       }
          

    // ]


  return (
        <>
            <PageHeader title='PLACE LIST'
        />

            <Paper elevation={0}>
                 <DataGrid
                        autoHeight
                        rows={placeList}
                        // rows={getAdd}
                        columns={tableHeader}
                        pageSize={ pageSize}
                        OnPageSizeChange={ (size) => setPageSize(size) }
                        rowsPerPageOptions={[9, 50, 100]}
                        showColumnRightBorder
                        showCellRightBorder
                        disableSelectionOnClick
                />

            </Paper>

            {/* <Paper elevation={0}>
                 <DataGrid
                        autoHeight
                        // rows={placeList}
                        rows={getlist}
                        columns={tableHeader2}
                        pageSize={ pageSize}
                        OnPageSizeChange={ (size) => setPageSize(size) }
                        rowsPerPageOptions={[9, 50, 100]}
                        density='comfortable'
                        showColumnRightBorder
                        showCellRightBorder
                        disableSelectionOnClick
                />

            </Paper> */}

            {/* <PlaceCreateModal 
             show={showCreateModel}
             onClose={ () => setShowCreateModel(false)}
            //  onSuccess={ onCreateSuccess}
        /> */}
        </>
  )
}

export default Place


// const PlaceCreateModal = ({ show, onClose, onSuccess }) => {

//     const [name, setName] = useState('')
//     const [nameErr, setNameErr] = useState(false)
//     const [onSubmit, setOnSubmit] = useState(false)


//     const createPlace = async() => {
//         if (onSubmit) return 
//         if (!name || name.trim().length === 0) {
//             setNameErr(true)
//             return
//         }
//         setNameErr( false)
//         setOnSubmit(true)

//         try {
//             const res = await placeApi.create({name})
//             console.log('got place res:', res )
//             setName('')
//             onSuccess(res)

//         } catch(error) {
//             console.log('Error createPlace', error)
//         } finally {
//             setOnSubmit(false)
//         }
//         // console.log('vaccine created')
//         // onSuccess ('new vaccine')
//     }
//     return (
//         <CustomDialog 
//                 open={show}
//                 title='Add Place'
//                 content={ 
//                     <Box padding='5px 0'>
//                         <FormControl>
//                             <TextField  
//                                 label='Place name' 
//                                 variant='outlined'
//                                 value={name}
//                                 onChange={ (e) => setName(e.target.value) } 
//                                 error={nameErr}
//                             />
//                         </FormControl>
//                     </Box>
//                  }
//                  actions={
//                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} width='100%'
//                      >
//                          <Button variant='text' onClick={() => onClose() }>
//                              Cancel
//                          </Button>

//                          <LoadingButton variant='contained' onClick={createPlace} loading={onSubmit}>
//                              Create
//                          </LoadingButton>

//                      </Box>
//                  }
//         />

//     )
// }