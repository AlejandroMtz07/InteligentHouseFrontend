import { NavLink } from 'react-router-dom'; // Importante: usamos NavLink
import styles from './SideBar.module.css';
import { FiAirplay, FiLogOut, FiEdit, FiCpu } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';

export default function SideBar() {
  const logout = () => {
    localStorage.removeItem('isLoged');
    localStorage.removeItem('token');
  }

  return (
    <aside className={styles.sidebar}>
      
      <div className={styles.header}>
        <FiCpu size={28} style={{ color: '#3b82f6' }} />
        <span className={styles.logoText}>Intelligent H.</span>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <NavLink 
              to="/home/device" 
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <FiAirplay size={22} />
              <span>Devices</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/home/scanner"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <FaQrcode size={22} />
              <span>Scan new device</span>
            </NavLink>
          </li>
          {/* --- ¡Aquí está el nuevo enlace que añadió tu compañero! --- */}
          <li>
            <NavLink 
              to="/home/edit/0"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <FiEdit size={22} />
              <span>Edit device</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.footer}>
        <NavLink to="/" onClick={logout} className={styles.navLink}>
          <FiLogOut size={22} />
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
}