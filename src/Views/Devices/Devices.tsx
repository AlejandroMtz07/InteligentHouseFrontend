import axios from 'axios';
import styles from './Devices.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader'; // Asumo que tienes este componente
import { FaQrcode } from 'react-icons/fa';

type Device = {
  id: number,
  devicename: string,
  devicedescription: string,
  status: number,
  lastlecture: string,
  lastdata: string,
}

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(
      'https://ih-backend.mnz.dom.my.id/devices',
      { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
    ).then((result) => {
      setDevices(result.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Mis Dispositivos</h1>
        <p className={styles.subtitle}>Gestiona y monitorea tus dispositivos conectados.</p>
      </header>

      {devices.length > 0 ? (
        <div className={styles.devicesGrid}>
          {devices.map((item: Device) => {
            const statusText = item.status === 1 ? 'Active' : 'Inactive';
            const formattedDate = new Date(item.lastlecture).toLocaleString('es-MX', {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit', hour12: false,
            });

            return (
              <div key={item.id} className={styles.deviceCard}>
                <div className={styles.deviceTitle}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.deviceName}>{item.devicename}</h2>
                    <h5>{item.devicedescription}</h5>
                  </div>

                  <div className={styles.status_container}>
                    <div data-status={statusText} className={styles.statusIndicator} title={statusText}></div>
                  </div>
                </div>

                <hr className={styles.separador}/>

                <div className={styles.cardBody}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Estado:</span>
                    <span className={styles.infoValue}>{statusText}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Última lectura:</span>
                    <span className={styles.infoValue}>{formattedDate}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Último dato:</span>
                    <meter 
                      min={0} 
                      max={100} 
                      optimum={20} 
                      value={String(item.lastdata)} 
                      low={5} 
                      high={40} 
                      className={styles.infoMeter}
                    />
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <Link to={`/home/edit/${item.id}`} className={styles.editButton}>
                    Editar
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.noDevicesMessage}>
          <p>No tienes dispositivos vinculados todavía.</p>
          <Link to="/home/scanner">
            <FaQrcode />
            Registrar un nuevo dispositivo
          </Link>
        </div>
      )}
    </div>
  );
}