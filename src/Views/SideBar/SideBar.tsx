import { Link } from 'react-router-dom'
import style from './SideBar.module.css'
import { FiAirplay, FiCamera, FiLogOut} from 'react-icons/fi'

export default function SideBar() {
    return (
        <aside className={style.sidebar}>
            <nav className={style.div_sidebar}>
                <ul className=''>
                    <li className={style.li_sidebar}>
                        <Link to={'/home/device'}>Devices<FiAirplay size={25} /></Link>
                    </li>
                    <li className={style.li_sidebar}>
                        <Link to={'/home/scanner'}>Scan new device <FiCamera size={25} /></Link>
                    </li>
                    <li className={style.li_sidebar}>
                        <Link to={"#"}>Logout <FiLogOut size={25}/></Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
