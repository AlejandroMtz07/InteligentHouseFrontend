import { Scanner as QrScanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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
          navigate(`/home/edit/${detectedCodes[0].rawValue.slice(-1)}`);
        }, 1500);
      }).catch((error) => {
        if(error.status == 403){
          toast.warning('Login to see your devices');
        }
      })
    }
  }

  return (
    <>
      <ToastContainer />
      <QrScanner
        onScan={handleScan}
        styles={{ container: { height: 400, width: 400, borderRadius: "10px", } }}
        sound={false}
      />
    </>
  )
}
