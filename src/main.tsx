import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Views/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './Views/Register/Register'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
