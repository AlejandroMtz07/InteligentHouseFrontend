import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Views/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './Views/Register/Register'
import Home from './Views/Home/Home'
import Scanner from './Views/ScanDevice/Scanner'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}>
          <Route path='device' element={<Scanner/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
