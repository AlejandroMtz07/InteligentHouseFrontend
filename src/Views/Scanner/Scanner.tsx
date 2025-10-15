import { Scanner as QrScanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importante para los estilos de las notificaciones
import styles from './Scanner.module.css'; // Importamos los nuevos estilos


export default function Scanner() {

  const navigate = useNavigate();
  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      axios.post(
        detectedCodes[0].rawValue,
        {},
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
      ).then((result) => {
        toast.success(result.data.msg);
        setTimeout(() => {
          // Extrae el ID del final de la URL escaneada
          const urlParts = detectedCodes[0].rawValue.split('/');
          const deviceId = urlParts[urlParts.length - 1];
          navigate(`/home/edit/${deviceId}`);
        }, 1500);
      }).catch((error) => {
        if (error.response && error.response.status === 403) {
          toast.warning('Inicia sesión para ver tus dispositivos');
        } else {
          toast.error('Hubo un error al escanear.');
        }
      })
    }
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Escanear Dispositivo</h1>
        <p className={styles.subtitle}>Apunta la cámara al código QR para vincular un nuevo dispositivo.</p>
      </header>

      {/* Centramos la tarjeta del escáner */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <div className={styles.scannerContainer}>
          <QrScanner
            onScan={handleScan}
            styles={{
              container: {
                width: '100%',
                borderRadius: '0.5rem', /* Bordes redondeados para la cámara */
                overflow: 'hidden',     /* Asegura que el video no se salga */
              }
            }}
            constraints={{ facingMode: 'environment' }} // Para usar la cámara trasera en móviles
            sound={false}
          />
        </div>
      </div>
    </div>
    
  )
}