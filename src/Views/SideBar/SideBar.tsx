import { Link } from 'react-router-dom';
import style from './SideBar.module.css';
import { FiAirplay, FiLogOut, FiEdit } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';
import { useState } from 'react';

export default function SideBar() {

    const [selectedDevice, setSelectedDevice] = useState(0);

    const logout = () => {
        localStorage.removeItem('isLoged');
        localStorage.removeItem('token');
    }
    const handleEditDevice = (deviceId:number)=>{
        setSelectedDevice(deviceId);
    }

    return (
        <aside className={style.sidebar}>
            <nav className={style.div_sidebar}>
                <ul>
                    <li className={style.li_sidebar}>
                        <Link to={'/home/device'}>Devices<FiAirplay size={25} /></Link>
                    </li>
                    <li className={style.li_sidebar}>
                        <Link to={'/home/scanner'}>Scan new device <FaQrcode size={25} /></Link>
                    </li>
                    <li className={style.li_sidebar}>
                        <Link to={"/home/edit/0"}>
                            Edit device information<FiEdit size={25} />
                        </Link>
                    </li>
                    <li className={style.li_sidebar}>
                        <Link to={"/"} onClick={logout}>Logout <FiLogOut size={25} /></Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
