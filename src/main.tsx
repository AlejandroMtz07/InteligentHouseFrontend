import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Views/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './Views/Register/Register'
import Home from './Views/Home/Home'
import Scanner from './Views/Scanner/Scanner'
import Devices from './Views/Devices/Devices'
import ProtectedRoutes from './Utils/ProtectedRoutes'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />}>
            <Route path='device' element={<Devices />} />
            <Route path='scanner' element={<Scanner />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
