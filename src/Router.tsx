import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Views/Login/Login";
import { Register } from "./Views/Register/Register";
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import Home from "./Views/Home/Home";
import Devices from "./Views/Devices/Devices";
import Scanner from "./Views/Scanner/Scanner";
import Edit from "./Views/EditDevice/Edit";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register/>} />
                <Route element={<ProtectedRoutes />}>
                    <Route path='/home' element={<Home />}>
                        <Route path='device' element={<Devices />} />
                        <Route path='scanner' element={<Scanner />} />
                        <Route path='edit/:id' element={<Edit />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
