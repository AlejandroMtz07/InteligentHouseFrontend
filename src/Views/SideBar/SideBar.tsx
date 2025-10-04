import style from './SideBar.module.css'
import {FiAirplay, FiCamera} from 'react-icons/fi'

export default function SideBar() {
    return (
        <aside className={style.sidebar}>
            <div className={style.div_sidebar}>
                <ul className=''>
                    <li className={style.li_sidebar}>
                        <a href='#'>Devices<FiAirplay size={25}/></a>
                    </li>
                    <li className={style.li_sidebar}>
                        <a href="#">Scan new device <FiCamera size={25}/></a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
