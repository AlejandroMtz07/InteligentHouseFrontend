import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import z from "zod";
import style from './Edit.module.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

//New information schema
const newDeviceInformation = z.object({
    devicename: z.string().min(4, 'Device name must be 3 characters long'),
    devicedescription: z.string().min(5, 'Device description must be 5 characters long')
})

type InformationDevice = z.infer<typeof newDeviceInformation>;


export default function Edit() {

    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(newDeviceInformation)
    });
    const navigate = useNavigate();

    const direction = '192.168.0.93:8080'
    const onSubmit = (data: InformationDevice) => {
        axios.put(
            `http://${direction}/devices/${id}`,
            {
                devicename: data.devicename,
                devicedescription: data.devicedescription
            },
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        ).then((result) => {
            console.log(result);
            if (result.status == 200) {
                toast.success('Device updated');
                setTimeout(()=>{
                    navigate('/home/device');
                },1500)
            }
        }).catch((error) => {
            if (error.status == 404) {
                toast.warning('Device not found');
            }
            toast.error('Something happened');  
        })
    }

    return (
        <div>
            {(id == '0') ?
                'Select a device in the Devices page to edit' :
                (<div className={style.edit_container}>
                    <ToastContainer />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={style.input_container}>
                            <label htmlFor="devicename">New device name: </label>
                            <input {...register('devicename', { required: true })} id="devicename" autoComplete="off" />
                            {errors.devicename && <p>{errors.devicename.message}</p>}
                        </div>
                        <div className={style.input_container}>
                            <label htmlFor="devicename">New device description: </label>
                            <input {...register('devicedescription', { required: true })} id="devicedescription" autoComplete="off"/>
                            {errors.devicedescription && <p>{errors.devicedescription.message}</p>}
                        </div>
                        <div className={style.input_container}>
                            <button type="submit">
                                Update
                            </button>
                        </div>
                    </form>
                </div>)
            }
        </div>
    )
}
