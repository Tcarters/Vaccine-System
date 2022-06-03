import { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import  {PageHeader}  from '../components'
import { Button, Paper, Typography } from '@mui/material'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import userApi from '../api/userApi';
import { Box } from '@mui/system';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { orange } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';


const Patients = () => {
  const [patientList, setPatientList ] = useState([])
  const [pageSize, setPageSize ] = useState(9)

  useEffect( () => {
    const getPatients = async () => {
      try {
        const res = await userApi.getAll()
        setPatientList(res)
        console.log('All Patients ', res )

      } catch(err) {
        console.log('Error get Patients: ', err)
      }
    }

    getPatients()
  }, [])


  const tableHeader = [
    {
      field: 'idNumber',
      headerName: 'ID Card',
      renderCell: (params) => {
              <Button 
                  variant='text' 
                  component={Link} 
                  to={`${params.row.id}`}
              >
                   { params.value}
              </Button>
       }
    },
    {
      field: 'fullName', headerName: 'Full Name', width: 220
    },
    {
      field: 'phoneNumber', headerName: 'Phone Number', width: 170
    },
    {
      field: 'vaccine',
      headerName: 'Patient vaccination  Status',
      width: 220,
      renderCell: (params) => <Box
              sx={{ display: 'flex', alignItems: 'center' }}
              color={params.value.length > 1 ? 'green' : params.value.length === 1 ? 'orange' : ' red' }
      
      >
                {
                  params.value.length > 1 && <VerifiedUserIcon/>
                }
                {
                  params.value.length === 1 && <ShieldOutlinedIcon/>
                }
                {
                  params.value.length < 1 && <ErrorOutlineOutlinedIcon/>
                }

                <Typography
                      variant='body2'
                      sx={{ marginLeft: '10px', fontWeight: '500' }}
                >
                      Vaccinated with { params.value.length } dose { params.value.length > 1 && 's'}
                </Typography>
            </Box>
    },

    {
      field: 'address', headerName: 'Location ', flex: 1
    },
    {
      field: 'id',
      headerName: 'Actions',
      width: 170,
      renderCell: (params) => <Button
                    variant='text'
                    component={Link}
                    to={`${params.value}`}
                    startIcon={<OpenInNewOutlinedIcon/>}
      >
        Detail 

      </Button>

    }
  ]


  return (
    <>
        {/* <div>Patients</div> */}

          <PageHeader 
              title='Patients List '
              rightContent={
                <Button
                      variant='contained'
                      component={Link }
                      to='create'
                      startIcon={<PersonAddOutlinedIcon/>}
                >
                  Create
                </Button>
              }
          /> 

          <Paper elevation={0}>
              <DataGrid
                   autoHeight
                   rows={patientList}
                   columns={tableHeader}
                   pageSize={pageSize}
                   rowsPerPageOptions={[9, 50, 100 ]}
                   onPageSizeChange={(size) => setPageSize(size) }
                   density='comfortable'
                   showColumnRightBorder
                   showCellRightBorder
                   disableSelectionOnClick
              />
          </Paper>

    </>
  )
}

export default Patients