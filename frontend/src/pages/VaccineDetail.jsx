import { useEffect, useState } from 'react'
import vaccineApi from '../api/vaccineApi'
import { PageHeader, CustomDialog, VaccineLots, Loading } from '../components'
import { useParams, useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { Button, Card, CardContent, Grid, FormControl, TextField, CardActions, Typography, Box } from '@mui/material'



const VaccineDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [vaccine, setVaccine] = useState()
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [quantityErr, setQuantityErr] = useState(false)
    const [nameErr, setNameErr] = useState(false)
    const [onSubmit, setOnSubmit] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogType, setDialogType] = useState('')
    const [dialogText, setDialogText] = useState('')
    const [onDelete, setOnDelete] = useState(false)


    useEffect( () => {
        const getVaccine = async () => {
            try {
                const res = await vaccineApi.getOne(id)
                // console.log('ans:', res)
                setVaccine(res)
                setName(res.name)
                setQuantity(res.quantity)

            } catch(err) {
                console.log('Error got Vaccine', err)
            }
        }
        getVaccine()
    }, [])
    // console.log('data vacc', vaccine )

    const updateVaccine = async() => {
        if (onSubmit) return 
        // if (!name || name.trim().length === 0) {
        //     setNameErr(true)
        //     return
        // }
        const err = [!name, !quantity]
        setNameErr(!name)
        // if (!quantity ) {
        //     setQuantityErr(true)
        //     return
        // }

        setQuantityErr(!quantity)
        if (!err.every(e => !e)) return


        // setNameErr(false)
        setOnSubmit(true)


        const params = {
            name,
            quantity
        }
        console.log('value of params', params)

        try {
            // const res = 
            await vaccineApi.update(id, params )
            // console.log('Res new:', res)
            setDialogText('Vaccine Updated  Successfully !!!')
            setDialogType('success')
            // setDialogOpen(true)

        } catch(error) {
            console.log('Error updateVaccine', error)
            setDialogText('Vaccine Update Failed  !!')
            setDialogType('error')
        } finally {
            setOnSubmit(false)
            setDialogOpen(true)
        }
    }

    const deleteVaccine = async() => {
        if (onDelete) return
        setOnDelete(true)
        try {
            await vaccineApi.delete(id)
            setOnDelete(false)
            navigate('/admin/vaccine')

        } catch( error) {
            setOnDelete(false)
            console.log('Error DeleteVaccine', error)
            setDialogText('Delete Vaccine Failed ')
            setDialogType('error')
            setDialogOpen(true)
        } 
    }

    const resetPage = async() => {
    try {
        const res = await vaccineApi.getOne(id)
        setVaccine(res)
        setName(res.name)
    } catch(err) {
        console.log(err)
    }
}

  return (
    <>
        <PageHeader 
                title='Vaccine detail'
                rightContent={
                    <LoadingButton
                        variant='text'
                        disableElevation
                        loading={onDelete}
                        color='error'
                        onClick={deleteVaccine}
                    
                    >
                        Delete

                    </LoadingButton>
                }
        /> 

        <Grid container spacing={4}>
            <Grid item xs={4}>
                <Card elevation={0}>
                        <CardContent>
                                    <FormControl fullWidth margin='normal'>
                                            <TextField  
                                                label='Vaccine name' 
                                                variant='outlined'
                                                value={name}
                                                onChange={ (e) => setName(e.target.value) } 
                                                error={nameErr}
                                            />
                                    </FormControl>
                                    
                                    
                                    {
                                        vaccine && <>

                                                <FormControl fullWidth margin='normal'>
                                                        <TextField  
                                                            label='Quantity' 
                                                            type='number'
                                                            variant='outlined'
                                                            value={vaccine.quantity}
                                                            // onChange={(e) => setQuantity(e.target.value) }
                                                            // error={quantityErr}
                                                            // InputProps= {{ onChange = {(e) => setQuantity(e.target.value) } } }
                                                            InputProps ={ { readOnly: true}}
                                                            
                                                        />
                                                </FormControl>

                                                <FormControl fullWidth margin='normal'>
                                                    <TextField  
                                                        label='Available' 
                                                        variant='outlined'
                                                        value={vaccine.quantity - vaccine.vaccinated}
                                                        InputProps={ { readOnly: true}}
                                                        
                                                    />
                                                </FormControl>

                                                <FormControl fullWidth margin='normal'>
                                                        <TextField  
                                                            label='People Vaccinated ' 
                                                            variant='outlined'
                                                            value={vaccine.vaccinated}
                                                            InputProps={ { readOnly: true}}
                                                            
                                                        />
                                                 </FormControl>
                                                
                                        </>
                                    }
                                    
                        </CardContent>

                        <CardActions>
                            <LoadingButton
                                    variant='contained'
                                    loading={onSubmit}
                                    disableElevation
                                    onClick={updateVaccine}
                            >
                                Update
                            </LoadingButton>
                        </CardActions>
                </Card>
            </Grid>

            <Grid item xs={8}>
                
                {
                    vaccine &&
                             <VaccineLots vaccine={vaccine} 
                                    onLotAdded={resetPage}
                                    onLotDeleted={resetPage}
                                    onLotUpdated={resetPage}
                                     />
                }
            </Grid>
        </Grid>

        <CustomDialog
                open={dialogOpen}
                type={dialogType}
                showIcon
                content={
                    <Typography variant='subtitle1' textAlign='center'>
                        { dialogText}
                    </Typography>
                }
                actions={<Box width='100%' sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant='contained' onClick={ () => setDialogOpen(false) }>
                            OK
                    </Button>
                </Box>}
        />
     </>
  )
}

export default VaccineDetail