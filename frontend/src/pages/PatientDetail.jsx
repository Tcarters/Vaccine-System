import { Card, CardContent, Fab,  FormControl, Grid, Stack, TextField, Autocomplete, Box, CardActions, Typography, Button } from '@mui/material'
import {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userApi from '../api/userApi'
import { PageHeader, CustomDialog, PatientVaccine } from '../components'
import addressList from '../assets/cities.json'
import { LoadingButton } from '@mui/lab'
import QRCode from 'react-qr-code';
import QRCode2 from 'qrcode'
import { GetApp } from '@mui/icons-material'


const PatientDetail = () => {
    const { id } = useParams()
    const [patient, setPatient] = useState()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogType, setDialogType] = useState('')
    const [dialogText, setDialogText] = useState('')
    const [imgURL, setImgURL] = useState('')
    const [getId, setGetId] = useState()

    useEffect( () => {
        const getPatient = async () => {
            try {
                const res = await userApi.getOne(id)
                // console.log('ans:', res)
                setPatient(res)
                setGetId(res.id)
            } catch (error) {
                console.log('Error DetailPatient:', error )
            }

           
        }

        getPatient()
    }, [])
    // const text =  [ patient.id  ]  
    const generateImg = async () => {
        try {
            const res = await QRCode2.toDataURL( getId )
            setImgURL(res)
        } catch (err) {
            console.log('Error Generate ImgURL', err)
        } 
        let aEL = document.createElement("a")
            aEL.href= imgURL
            aEL.download = "qr_code.png"
            document.body.appendChild(aEL)
            aEL.click()
            document.body.removeChild(aEL)
    }
    // generateImg()

    const onUpdateSuccess = () => {
        console.log('onUpdateSuccess')
        setDialogType('success')
        setDialogText('Patient Info Updated Successfully !!! ')
        setDialogOpen(true)
    }

    const onUpdateFalse = (message) => {
        console.log('onUpdateFalse')
        setDialogType('error')
        setDialogText(message || 'Patient update failed !!')
        setDialogOpen(true)
    }

    // const downloadQR = async () => {
    //     const canvas = document.getElementById('qrcode')
    //     //.querySelector('canvas')
    //     console.log('Data canvas:', canvas, )
    //     // const pngUrl = await canvas?.toDataURL()
    //      //("image/png")
    //     //   .replace("image/png", "image/octet-stream");
        
    //      console.log('URL:', QRCode2.toDataURL() )
    //     let downloadLink = document.createElement("a");
    //     downloadLink.href = pngUrl;
    //     downloadLink.download = "qrcode.png";
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    //     document.body.removeChild(downloadLink);
    // }
    // downloadQR()
    // console.log('P', imgURL )

  return (
      <>
        <PageHeader title ='Patient Detail'/>

        <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Stack spacing={4}>
                        {
                            patient && <PatientInfo 
                                    patient={patient}
                                    onUpdateFalse={onUpdateFalse}
                                    onUpdateSuccess={onUpdateSuccess}
                            />
                        }

                        {
                            patient && <PatientVaccine patient={patient} 
                            
                            />
                        }
                    </Stack>
                </Grid>

                <Grid item xs={3}>
                    <Card elevation={0}>
                        <CardContent>
                            <Box sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            
                            >
                                {
                                    patient && <QRCode 
                                        id='qrcode'
                                        value={patient._id}
                                        size={235}
                                        level='H'
                                    
                                    />
                                }

                            </Box>
                            {
                                patient && 
                                
                                 <Grid item xs={2}>
                                         <Fab onClick={ () => generateImg() 
                                          //?  `<a href=${imgURL} download="qr.png"><img src=${imgURL} alt="png" /></a>` : null
                                            //generateImg() &&
                                                
                                                    // <>
                                                    //   imgURL ? (
                                                    //     <a href={imgURL} download="qrcode.png">
                                                    //         <img src={imgURL} alt="png"></img>
                                                    //     </a> ) : null
                                                    // </>  
                                            } 
                                              style={{marginLeft:10}} 
                                              color="primary">
                                             <GetApp/>
                                         </Fab>
                                    {/* { 
                                    
                                    imgURL ? (
                                        <a href={imgURL} download="qrcode.png">
                                            <img src={imgURL} alt="png"></img>
                                        </a> ) : null
                                    } */}


                                 </Grid>
                            }
                                

                        </CardContent>
                    </Card>
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

export default PatientDetail

const PatientInfo = ( { patient, onUpdateFalse, onUpdateSuccess } ) => {

    const [onUpdate, setOnUpdate] = useState(false)
    const [name, setName] = useState(patient.fullName)
    const [nameErr, setNameErr] = useState(false)
    const [phone, setPhone] = useState(patient.phoneNumber)
    const [phoneErr, setPhoneErr] = useState(false)
    const [address, setAddress] = useState(addressList.find( e => e.name === patient.address || undefined ))
    const [addressErr, setAddressErr] = useState(false)
    const [idCard, setIdCard] = useState(patient.idNumber)
    const [idCardErr, setIdCardErr] = useState(false)

    const updatePatient = async () => {
        if ( onUpdate ) return

        const err = [!phone, !name, !address, !idCard ]

        setIdCardErr(!idCard)
        setPhoneErr(!phone)
        setNameErr(!name)
        setAddressErr(!address)

        if (!err.every(e => !e)) return
        
        setOnUpdate(true)

        const params = {
            phoneNumber: phone,
            fullName: name,
            idNumber: idCard,
            address: address.name
        }

        try {
            const res = await userApi.update(patient.id, params)
            // console.log('Res:', res)
            setOnUpdate(false)
            onUpdateSuccess()
        } catch(err) {
            setOnUpdate(false)
            console.log('Got Error', err.response)
            onUpdateFalse(err.response.data)
        }

    }

    return (
        <Card elevation={0}>
            <CardContent>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin='normal'>
                            <TextField
                                label='Id Card'
                                variant='outlined'
                                value={idCard}
                                onChange={ (e) => setIdCard(e.target.value) }
                                error={idCardErr}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth margin='normal'>
                            <TextField
                                    label='Fullname'
                                    variant='outlined'
                                    value={name}
                                    onChange={ (e) => setName(e.target.value) }
                                    error={nameErr}
                            />
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={6}>
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
                    </Grid>

                    <Grid item xs={6}>
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
                    </Grid>

                </Grid>        
            </CardContent>

            <CardActions>
                <LoadingButton
                    variant='contained'
                    disableElevation
                    onClick={updatePatient}
                    loading={onUpdate}
                >
                    Update
                </LoadingButton>
            </CardActions>
        </Card>
    )
}