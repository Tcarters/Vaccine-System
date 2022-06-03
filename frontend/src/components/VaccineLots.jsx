import { LoadingButton } from '@mui/lab'
import { Box, Button, Card, CardContent, CardHeader, FormControl, TextField, Typography } from '@mui/material'
import { DataGrid, selectedIdsLookupSelector } from '@mui/x-data-grid'
import moment from 'moment'
import React, { useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CustomDialog from './CustomDialog'
import vaccineLotsApi from '../api/vaccineLotsApi'


const VaccineLots = ({ vaccine, onLotAdded, onLotDeleted, onLotUpdated  }) => {
    // console.log('Vacc:', vaccine )
    const [pageSize, setPageSize] = useState(5)
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [onSubmit, setOnSubmit] = useState( false)
    const [lotNumber, setLotNumber] = useState('')
    const [lotNumberErr, setLotNumberErr] = useState(false)
    const [quantity, setQuantity] = useState('')
    const [quantityErr, setQuantityErr] = useState(false)
    const [onDelete, setOnDelete] = useState(false)
    const [showUpdateDialog, setShowUpdateDialog] = useState(false)
    const [onUpdate, setOnUpdate] = useState(false)
    const [selectedLot, setSelectedLot] = useState()

    
    const tableHeader = [
        {
            field: 'name', headerName: 'Vaccine Lot No', width: 200
        },
        {
            field: 'quantity', headerName: 'Quantity ', width: 100, align: 'center',
            renderCell: (params) => { return  params.value  ?  `${ params.value.toLocaleString('de-DE') }` : 'Empty'  }
        },
        {
            field: 'Vaccinated', headerName: 'People Vaccinated ', width: 150, align: 'center',
            renderCell: (params) => { return params.value ? `${ params.value.toLocaleString('de-DE') }` : 0  }
        },
        {
            field: 'id', headerName: 'Available', width: 150, align: 'center',
            renderCell: (params) => (params.row.quantity - params.row.vaccinated).toLocaleString('de-DE')
        },
        {
            field: 'createdAt', headerName: 'Time', flex: 1,
            renderCell: (params) => moment(params.value).format('DD-MM-YYYY HH:mm:ss ')
        },
        {
            field: '_id',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) =>(
                <>
                    <LoadingButton 
                        color='error' 
                        disableElevation 
                        startIcon={<DeleteOutlineOutlinedIcon/>}
                        loading={onDelete}
                        onClick={ () => deleteLot(params.row.id)}
                    >
                        Delete
                    </LoadingButton>

                    <Button
                        disableElevation
                        startIcon={<ModeEditOutlineOutlinedIcon />}
                        onClick={ () => selectLot(params.row)}
                    >
                        Edit
                    </Button>
                
                </>
            )
        }

    ]

    const createLot = async () => {
        if ( onSubmit ) return 

        const err = [!lotNumber, !quantity]
        setLotNumberErr(!lotNumber)
        setQuantityErr(!quantity)

        if (!err.every (e => !e)) return
        setOnSubmit(true)

        const params = {
            vaccineId: vaccine.id,
            name: lotNumber,
            quantity
        }
        try {
            await vaccineLotsApi.create(params)
            setQuantity('')
            setLotNumber('')
            setShowAddDialog(false)
            onLotAdded()
        } catch(err) {
            setOnSubmit(false)
            console.log('Error createLot ', err)
        } finally { setOnSubmit(false) }

    }

    const deleteLot = async(lotId) => {
        if (onDelete) return 
        setOnDelete(true)

        try {
            await vaccineLotsApi.delete(lotId)
            onLotDeleted()

        } catch (err) {
            console.log('Error DeleteLotVaccine', err)
        } finally {
            setOnDelete(false)
        }
    }

    const selectLot = (lot) => {
        setLotNumber(lot.name)
        setQuantity(lot.quantity)
        setSelectedLot(lot)
        setShowUpdateDialog(true)
    }
    const hideUpdateDialog = () => {
        setLotNumber('')
        setQuantity('')
        setSelectedLot(undefined)
        setShowUpdateDialog(false)
    }


    const updateLot = async () => {
        if ( onUpdate ) return 

        const err = [!lotNumber, !quantity]
        setLotNumberErr(!lotNumber)
        setQuantityErr(!quantity)

        if (!err.every (e => !e)) return
        setOnUpdate(true)

        const params = {
            name: lotNumber,
            quantity
        }
        try {
            await vaccineLotsApi.update(selectedLot.id ,params)
            setQuantity('')
            setLotNumber('')
            setShowUpdateDialog(false)
            onLotUpdated()
        } catch(err) {
            // setOnSubmit(false)
            console.log('Error UpdateLot ', err)
        } finally { 
            setOnUpdate(false) }
    }

  return (
    <>
        <Card elevation={0}>
            <CardHeader 
                title={
                    <Typography variant='h6'>
                        Vaccine Lots Information
                    </Typography>
                }
                action={
                    <Button variant='contained' 
                        disableElevation
                        onClick={ () => setShowAddDialog(true)}
                    >
                        Add Lot
                    </Button>
                }
            />
            <CardContent>
                <DataGrid 
                    autoHeight
                    rows={vaccine.vaccineLots}
                    columns={tableHeader}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 30]}
                    onPageSizeChange={ (size) => setPageSize(size) }
                    density='comfortable'
                    showCellRightBorder
                    showColumnRightBorder
                    disableSelectionOnClick
                />
            </CardContent>
        </Card>

        <CustomDialog
            open={showAddDialog}
            title='Add Vaccine Lot'
            content={
                    <Box sx={{ width: '400px' }}>
                                <FormControl fullWidth margin='normal'>
                                    <TextField 
                                        label='Lot number'
                                        variant='outlined'
                                        value={lotNumber}
                                        onChange={ (e) => setLotNumber(e.target.value) }
                                        error={lotNumberErr}
                                    />
                                </FormControl>

                                <FormControl fullWidth margin='normal'>
                                    <TextField 
                                        label='Quantity'
                                        variant='outlined'
                                        type='number'
                                        value={quantity}
                                        onChange={ (e) => setQuantity(e.target.value) }
                                        error={quantityErr}
                                    />
                                </FormControl>
                    </Box>
                }
            actions={
                <Box width = '100%' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant='text'
                        onClick={() => setShowAddDialog(false) }
                        disable={onSubmit}
                    >
                        Cancel
                    </Button>

                    <LoadingButton
                        variant='contained'
                        disableElevation
                        loading={onSubmit}
                        onClick={createLot}
                    >
                        Save
                    </LoadingButton>
                </Box>
            }
        />

<CustomDialog
            open={showUpdateDialog}
            title='Update Vaccine Lot'
            content={
                    <Box sx={{ width: '400px' }}>
                                <FormControl fullWidth margin='normal'>
                                    <TextField 
                                        label='Lot number'
                                        variant='outlined'
                                        value={lotNumber}
                                        onChange={ (e) => setLotNumber(e.target.value) }
                                        error={lotNumberErr}
                                    />
                                </FormControl>

                                <FormControl fullWidth margin='normal'>
                                    <TextField 
                                        label='Quantity'
                                        variant='outlined'
                                        type='number'
                                        value={quantity}
                                        onChange={ (e) => setQuantity(e.target.value) }
                                        error={quantityErr}
                                    />
                                </FormControl>
                    </Box>
                }
            actions={
                <Box width = '100%' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant='text'
                        disable={onUpdate}
                        onClick={hideUpdateDialog}
                        // onClick={ () => setShowUpdateDialog(false) }
                    >
                        Cancel
                    </Button>

                    <LoadingButton
                        variant='contained'
                        disableElevation
                        loading={onUpdate}
                        onClick={updateLot}
                    >
                        Update
                    </LoadingButton>
                </Box>
            }
        />
        

    </>
  )
}

export default VaccineLots