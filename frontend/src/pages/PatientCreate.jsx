import React, { useState } from 'react'
import { Box, Button, Grid, Stack, Card, CardContent, FormControl, TextField, Autocomplete, Typography } from '@mui/material'
import PageHeader from '../components/PageHeader'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import addressList from '../assets/cities.json'
import userApi from '../api/userApi'
import { CustomDialog } from '../components'

// '../assets/addressV1.json'

const PatientCreate = () => {
    const navigate = useNavigate()
    const [onSubmit, setonSubmit ] = useState('')
    const [name, setName] = useState('')
    const [nameErr, setNameErr] = useState(false)
    const [phone, setPhone] = useState('')
    const [phoneErr, setPhoneErr] = useState(false)
    const [address, setAddress] = useState()
    const [addressErr, setAddressErr] = useState(false)
    const [idCard, setIdCard] = useState('')
    const [idCardErr, setIdCardErr] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogType, setDialogType] = useState('')
    const [dialogText, setDialogText] = useState('')


    const createPatient = async() => {
        console.log('CreatePatient')
        if ( onSubmit ) return

        const err = [!phone, !name, !address, !idCard ]

        setIdCardErr(!idCard)
        setPhoneErr(!phone)
        setNameErr(!name)
        setAddressErr(!address)

        if (!err.every(e => !e) ) return
        setonSubmit(true)

        const params = {
            phoneNumber: phone,
            fullName: name,
            idNumber: idCard,
            address: address.name
        }

        try {
            const res = await userApi.create(params)
            // console.log('Res:', res)
            setonSubmit(false)
            navigate(`/admin/patients/${res.user.id}`)
        } catch(err) {
            setonSubmit(false)
            // alert( err.response.data )
            setDialogText(err.response.data)
            setDialogType('error')
            setDialogOpen(true)
            console.log('Got Error', err.response)
        }

    }

 

// console.log('Data from add:', addressList.name )
  return (
      <>
            <Box width='40%' >
                <PageHeader
                        title='Add new Patient'
                        rightContent={
                            <Stack direction='row' spacing={2}>
                                    <Button variant='text' onClick={ () => navigate('/admin/patients')}>
                                        Cancel
                                    </Button>

                                    <LoadingButton
                                            variant='contained'
                                            onClick={createPatient}
                                            loading={onSubmit}
                                    >
                                        Create 

                                    </LoadingButton>
                            </Stack>
                        }

                /> 
                {/* end of PageHeader  */}

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        
                        <Card elevation={0} >
                               
                            <CardContent>
                                <FormControl fullWidth margin='normal'>
                                    <TextField
                                            label='Id Card'
                                            variant='outlined'
                                            value={idCard}
                                            onChange={(e) => setIdCard(e.target.value) }
                                            error={idCardErr}
                                    />
                                </FormControl>

                                <FormControl fullWidth margin='normal'>
                                    <TextField
                                            label='Fullname'
                                            variant='outlined'
                                            value={name}
                                            onChange={ (e) => setName(e.target.value) }
                                            error={nameErr}
                                    />
                                </FormControl>

                                <FormControl fullWidth margin='normal'>
                                    <TextField
                                            label='Phone'
                                            variant='outlined'
                                            type='number'
                                            value={phone}
                                            onChange={ (e) =>  setPhone(e.target.value) }
                                            error={phoneErr}
                                    />
                                </FormControl>

                                <FormControl fullWidth margin='normal'>
                                    <Autocomplete
                                        options={addressList}
                                        getOptionLabel={ (option ) => option.name || " " }
                                        renderOption={ (props, option) => <Box {...props} component='li' key={option.id}>
                                                { option.name }
                                        </Box>}
                                        renderInput={(params) => 
                                            <TextField {...params}
                                                label='Address'
                                                inputProps={{ ...params.inputProps, autoComplete: 'new-password'
                                                }}
                                                error={addressErr}

                                            />} /** end TextField */
                                        value={address}
                                        onChange={ (event, newValue) => setAddress(newValue) }

                                    />
                                </FormControl>


                            </CardContent>
                        </Card>              
                    </Grid>
                </Grid>
            </Box>

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
    {/* <div>PatientCreate</div>    */}

      </>
      
  )
}

export default PatientCreate