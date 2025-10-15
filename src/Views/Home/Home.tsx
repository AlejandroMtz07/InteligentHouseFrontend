import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import style from './Home.module.css';
import {FiCpu} from 'react-icons/fi'

export default function Home() {
  return (
    <div className={style.home}>
      
      <div className={style.content}>
        <SideBar/>
        <main className={style.main}>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}
