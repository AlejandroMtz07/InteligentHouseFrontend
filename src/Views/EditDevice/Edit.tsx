import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import z from "zod";
import styles from './Edit.module.css'; // Usamos styles en lugar de style
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const newDeviceInformation = z.object({
    devicename: z.string().min(4, 'El nombre debe tener al menos 4 caracteres'),
    devicedescription: z.string().min(5, 'La descripción debe tener al menos 5 caracteres')
});

type InformationDevice = z.infer<typeof newDeviceInformation>;

export default function Edit() {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm<InformationDevice>({
        resolver: zodResolver(newDeviceInformation)
    });
    const navigate = useNavigate();

    const onSubmit = (data: InformationDevice) => {
        axios.put(
            `http://localhost:8080/devices/${id}`,
            data, // Puedes pasar el objeto data directamente
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        ).then((result) => {
            if (result.status === 200) {
                toast.success('Dispositivo actualizado con éxito');
                setTimeout(() => {
                    navigate('/home/device');
                }, 1500);
            }
        }).catch((error) => {
            if (error.response && error.response.status === 404) {
                toast.warning('Dispositivo no encontrado');
            } else {
                toast.error('Ocurrió un error inesperado');
            }
        });
    }

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />

            <header className={styles.header}>
                <h1 className={styles.title}>Editar Dispositivo</h1>
                <p className={styles.subtitle}>Modifica la información de tu dispositivo seleccionado.</p>
            </header>

            {id === '0' ? (
                <div className={styles.promptMessage}>
                    Selecciona un dispositivo en la página "Mis Dispositivos" para poder editarlo.
                </div>
            ) : (
                <div className={styles.formCard}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="devicename" className={styles.label}>Nuevo nombre del dispositivo:</label>
                            <input {...register('devicename')} id="devicename" className={styles.input} />
                            {errors.devicename && <p className={styles.errorMessage}>{errors.devicename.message}</p>}
                        </div>
                        
                        <div className={styles.inputGroup}>
                            <label htmlFor="devicedescription" className={styles.label}>Nueva descripción del dispositivo:</label>
                            <input {...register('devicedescription')} id="devicedescription" className={styles.input} />
                            {errors.devicedescription && <p className={styles.errorMessage}>{errors.devicedescription.message}</p>}
                        </div>
                        
                        <button type="submit" className={styles.submitButton}>
                            Actualizar Dispositivo
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}