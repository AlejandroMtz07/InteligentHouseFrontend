import { Link } from 'react-router-dom';
import style from './SideBar.module.css';
import { FiAirplay, FiLogOut } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';

export default function SideBar() {

    const logout = () => {
        localStorage.removeItem('isLoged');
        localStorage.removeItem('token');
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
                        <Link to={"/"} onClick={logout}>Logout <FiLogOut size={25}/></Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
