import { Outlet, Navigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';

export default function Layout() {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        // ¡Aquí está la magia!
        // En pantallas pequeñas (móvil), la 1ª columna será de 80px.
        // En pantallas medianas y grandes (md:), la 1ª columna será de 256px.
        <div className="grid grid-cols-[80px_1fr] md:grid-cols-[256px_1fr] h-screen">
            <SideBar />
            
            <main className="bg-slate-100 p-4 md:p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}