import axios from 'axios';
import style from './Devices.module.css';
import { useEffect, useState } from 'react';

type Device = {
  id: number,
  status: number,
  lastlecture: Date,
  lastdata: string,
}

export default function Devices() {

  const [devices, setDevices] = useState([]);

  useEffect(()=>{
    axios.get(
      'http://localhost:8080/devices',
      {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
    ).then((result)=>{
      console.log(result);
      setDevices(result.data);
    }).catch((error)=>{
      console.log(error);
    })
  },[])
  
  return (
    <div className={style.devices}>
      {devices.map((item:Device,index)=>(
        <ul key={index} className={style.single_device}>
          <li>{item.id}</li>
          <li>Status: {(item.status===0)?'Inactive':'Active'}</li>
          <li>Last lecture: {item.lastlecture.toString()}</li>
          <li>Last data: {item.lastdata}</li>
        </ul>
      ))}
    </div>
  )
}
