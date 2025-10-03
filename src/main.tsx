import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Views/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './Views/Register/Register'
import StateExample from './Views/StateExample'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/state' element={<StateExample/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
