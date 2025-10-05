import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes (){
    const user = (localStorage.getItem('isLoged')?'true':null);
    return user ? <Outlet/> : <Navigate to={'/'}/>;
}


