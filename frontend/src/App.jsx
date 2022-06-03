import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {BrowserRouter, Routes, Route } from 'react-router-dom'

import { Login, AppLayout, Dashboard, Home,
         Patients, PatientCreate, PatientDetail, 
         Vaccine, VaccineDetail, Place,
         PlaceDetail, QRScan } from './pages';

const App = () => {
    return(

        <BrowserRouter>
            <Routes>
                <Route path='login' element={<Login/>} />
                <Route path='home' element={<Home />} />
                <Route path='admin' element={<AppLayout />}>

                      <Route path='dashboard'  element={<Dashboard />} />
                      <Route path='patients' element={<Patients/>} />
                      <Route path='patients/create' element={<PatientCreate/>} />
                      <Route path='patients/:id' element={<PatientDetail/>} />
                      <Route path='vaccine' element={<Vaccine/>} />
                      <Route path='vaccine/:id' element={<VaccineDetail/>} />
                      <Route path='place' element={<Place/>} />
                      <Route path='place/:id' element={<PlaceDetail /> }/>
                      <Route path='qr-scan' element={<QRScan/>} />

                </Route>
                App 
            </Routes>
        
        </BrowserRouter>
        
    )
}

export default App
