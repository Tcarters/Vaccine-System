import { LoadingButton } from '@mui/lab'
import { Button, CardHeader, Typography, Card, CardContent, FormControl, Autocomplete, TextField  } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userApi from '../api/userApi'
import vaccineApi from '../api/vaccineApi'
import CustomDialog from './CustomDialog'

const PatientVaccine = ({patient}) => {

  // console.log('Data patient', patient )
  const [patientVaccines, setPatientVaccines] = useState(patient.vaccinated)
  const [vaccineList, setVaccineList] = useState([])
  const [vaccineLots, setVaccineLots] = useState([])
  const [selectedVaccine, setSelectedVaccine] = useState()
  const [selectedLot, setSelectedLot] = useState()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [onAddVaccinated, setOnAddVaccinated] = useState(false)

  useEffect( () => {
        const getVaccines = async () => {
          try {
              const res = await vaccineApi.getAll()
              // console.log('ans:', res )
              setVaccineList(res)

          } catch (err) {
              console.log('Error get vaccines', err)
          }
      } /* end getvaccines funct*/
      getVaccines()
  }, [])

  useEffect( () => {
    if (!selectedVaccine) {
      setVaccineLots([])
      setSelectedLot(null)
      return

    }
    setVaccineLots(selectedVaccine.vaccineLots)

  }, [selectedVaccine])

  const tableHeader = [
    {
      field: 'vaccine',
      headerName: 'Vaccine',
      width: 200,
      renderCell: (params) => (
            <Button
              component={Link}
              to={`/admin/vaccine/${params.value.id}`}
              sx={{ textTransform: 'none'}}
            >
              {params.value.name}

            </Button>)
    },

    {
      field: 'vaccineLot', headerName: 'Lot', width: 150,
      renderCell: (params) => { return params.value ? `${params.value.name}` : 'None' }

    },

    {
      field: 'createdAt', headerName: 'Time', flex: 1,
      renderCell: (params) => moment(params.value).format('DD-MM-YYYY HH:mm:ss')
    }
  ]

  const closeAddDialog = () => {
    setSelectedVaccine(null)
    setShowAddDialog(false)
  }

  const addVaccinated = async() => {
    if (onAddVaccinated) return
    const err =[ !selectedVaccine, !selectedLot ]

    if (!err.every(e => !e)) return 
    setOnAddVaccinated(true)

    const params = { 
      userId: patient.id,
      vaccineId: selectedVaccine.id, 
      vaccineLotId: selectedLot.id
    }

    try {
      const res = await userApi.vaccinated(params)
      setPatientVaccines([res, ...patientVaccines])
      closeAddDialog()

    } catch(err) {
      console.log(err)
    } finally {
      setOnAddVaccinated(false)
    }
  }


  return (

    <>
      <Card elevation={0}>
        <CardHeader
            title={
                <Typography variant='h6'>
                    Vaccine Informations 
                </Typography>
              }
              action={
                <Button variant='contained' disableElevation onClick={() => setShowAddDialog(true) }>
                  Add vaccine registred
                </Button>
              }
        />
        <CardContent>
              <DataGrid
                autoHeight
                rows={patientVaccines || 'No record'}
                columns={tableHeader}
                pageSize={3} 
                rowsPerPageOptions={[3]}
                density='comfortable'
                showCellRightBorder
                showColumnRightBorder
              />

        </CardContent>
      </Card>
      
      <CustomDialog 
            open={showAddDialog}
            title='Patient vaccine registred'
            content={
                <Box sx={{ width: '400px'}}>
                      <FormControl fullWidth margin='normal'>
                          <Autocomplete 
                                options={vaccineList}
                                getOptionLabel={ (option) => option.name }
                                renderOption={
                                  (props, option) => <Box {...props} component='li' >
                                    {option.name}
                                    </Box>
                                }

                                renderInput={
                                    (params) => <TextField 
                                        {...params}
                                        label='Vaccine'
                                        inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
                                    />
                                }
                                value={selectedVaccine}
                                onChange={(event , value) => setSelectedVaccine(value) }
                          />
                      </FormControl>

                      <FormControl fullWidth margin='normal'>
                          <Autocomplete 
                                options={vaccineLots}
                                getOptionLabel={ (option) => option.name }
                                renderOption={
                                  (props, option) => <Box {...props} component='li'>
                                    {option.name}
                                    </Box>
                                }

                                renderInput={
                                    (params) => <TextField 
                                        {...params}
                                        label='Vaccine lot'
                                        inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
                                    />
                                }
                                value={selectedLot}
                                onChange={(e , value) => setSelectedLot(value) }
                          />
                      </FormControl>   
                </Box>
                }

                actions={
                  <Box 
                      sx={{ display: 'flex', justifyContent: 'flex-end' }}
                      width='100%'
                  >
                    <Button variant='text' onClick={closeAddDialog} disabled={onAddVaccinated}>
                        Cancel
                    </Button>
                    <LoadingButton
                          variant='contained'
                          onClick={addVaccinated}
                          loading={onAddVaccinated}
                          // disabled={}
                    >
                          Add
                    </LoadingButton>

                  </Box>}
      />
    </>
  )
}

export default PatientVaccine