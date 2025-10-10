import axios from 'axios';
import style from './Devices.module.css';
import { useEffect, useState } from 'react';

type Device = {
  id: number,
  status: number,
  lastlecture: string,
  lastdata: string,
}

export default function Devices() {

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios.get(
      'http://localhost:8080/devices',
      { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
    ).then((result) => {
      console.log(result);
      setDevices(result.data);
    }).catch((error) => {
      console.log({ msg: error });
    })
  }, [])

  return (
    <div className={style.devices}>
      {devices.map((item: Device, index) => {
        const date = new Date(item.lastlecture);
        const formattedDate = new Intl.DateTimeFormat("es-MX", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Mazatlan", // ajusta según tu zona
          hour12: false,
        }).format(date);
        const dateSection = formattedDate.split(',');

        return (
          <div key={index} className={style.single_device}>
            <div className={style.date_section}>
              <div className={style.time_section}>{dateSection[1]}</div>
              {dateSection[0]}
            </div>
            <div className={style.lecture_device}>{item.lastdata} C°</div>
          </div>
        )
      })}
    </div>
  )
}
