import { Scanner as QrScanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function Scanner() {

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      axios.post(
        detectedCodes[0].rawValue,
        {},
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
      ).then((result) => {
        toast(result.data.msg);
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  return (
    <>
    <ToastContainer/>
      <QrScanner
        onScan={handleScan}
        styles={{ container: { height: 400, width: 400, borderRadius: "10px",}}}
        sound={false}
      />
    </>
  )
}
