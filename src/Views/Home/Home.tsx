import SideBar from '../SideBar/SideBar';
import style from './Home.module.css';
import {FiCpu} from 'react-icons/fi'

export default function Home() {
  return (
    <body className={style.home}>
      <div className={style.title}>
        Inteligent Houses
        <FiCpu/>
      </div>
      <SideBar/>
    </body>
  )
}
