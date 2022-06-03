import { Button, FormControl, Paper, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import vaccineApi from '../api/vaccineApi'
import { CustomDialog, PageHeader } from '../components'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/system'
import { LoadingButton } from '@mui/lab'


const Vaccine = () => {
    const [vaccineList, setVaccineList] = useState([])
    const [pageSize, setPageSize] = useState(9)
    const [showCreateModel, setShowCreateModel] = useState(false)

    useEffect( () => {
        const getVaccines = async () => {
            try {
                const res = await vaccineApi.getAll()
                // console.log('ans:', res )
                setVaccineList(res)

            } catch (err) {
                console.log('Error geo vaccines', err)
            }
        } /* end getvaccines funct*/

        getVaccines()
    }, [])

    const tableHeader = [
        {
            field: 'name', headerName: 'Name', width: 400,
            renderCell: (params) => <Button 
                                         variant='text'
                                         component={Link}
                                         to={`/admin/vaccine/${params.row.id}`}
            >
                {params.value}

            </Button>
        },
        
        {
            field: 'quantity', headerName: 'Quantity', align: 'center', width: 150,
            renderCell: (params) => params.value.toLocaleString('de-DE')
        },

        {
            field: 'vaccinated', headerName: 'People Vaccinated', align: 'center',  width: 170,
            renderCell: (params) => params.value.toLocaleString('de-DE')
        },

        {
            field: 'id', headerName: 'Available', align: 'center',  width: 170,
            renderCell: (params) => (params.row.quantity - params.row.vaccinated).toLocaleString('de-DE')
        },

        {
            field: 'vaccineLots', headerName: 'Vaccine Lots', align: 'center',  width: 150,
            renderCell: (params) => params.value.length
        },

        {
            field: 'createdAt', headerName: 'Created At', align: 'center',  flex: 1,
            renderCell: (params) => moment(params.value).format('DD-MM-YYYY HH:mm:ss')
        },


    ]

    const  onCreateSuccess = (newVaccine) => {
        setVaccineList([newVaccine, ...vaccineList])
        setShowCreateModel(false)
        // console.log('vaccineList', vaccineList)
    }


  return (
      <>
        <PageHeader 
                title='Vaccine list'
                rightContent={
                <Button variant='contained' 
                        disableElevation
                        onClick={ () => setShowCreateModel(true) }
                >
                    Add new Vaccine
                </Button>}
        />

        <Paper elevation={0}>
            <DataGrid
                autoHeight
                rows={vaccineList}
                columns={tableHeader}
                pageSize={pageSize}
                rowsPerPageOptions={[9, 50, 100]}
                onPageSizeChange={ (size) => setPageSize(size) }
                density='comfortable'
                showColumnRightBorder
                showCellRightBorder
                disableSelectionOnClick
            />
        </Paper>

        <VaccineCreateModal 
             show={showCreateModel}
             onClose={ () => setShowCreateModel(false)}
             onSuccess={ onCreateSuccess}
        />
      
      </>
    // <div>Vaccine</div>
  )
}

export default Vaccine


const VaccineCreateModal = ({ show, onClose, onSuccess }) => {

    const [name, setName] = useState('')
    const [nameErr, setNameErr] = useState(false)
    const [onSubmit, setOnSubmit] = useState(false)


    const createVaccine = async() => {
        if (onSubmit) return 
        if (!name || name.trim().length === 0) {
            setNameErr(true)
            return
        }
        setNameErr( false)
        setOnSubmit(true)

        try {
            const res = await vaccineApi.create({name})
            setName('')
            onSuccess(res)

        } catch(error) {
            console.log('Error createVaccine', error)
        } finally {
            setOnSubmit(false)
        }
        // console.log('vaccine created')
        // onSuccess ('new vaccine')
    }
    return (
        <CustomDialog 
                open={show}
                title='Add Vaccine'
                content={ 
                    <Box padding='5px 0'>
                        <FormControl>
                            <TextField  
                                label='Vaccine name' 
                                variant='outlined'
                                value={name}
                                onChange={ (e) => setName(e.target.value) } 
                                error={nameErr}
                            />
                        </FormControl>
                    </Box>
                 }
                 actions={
                     <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} width='100%'
                     >
                         <Button variant='text' onClick={() => onClose() }>
                             Cancel
                         </Button>

                         <LoadingButton variant='contained' onClick={createVaccine} loading={onSubmit}>
                             Create
                         </LoadingButton>

                     </Box>
                 }
        />

    )
}