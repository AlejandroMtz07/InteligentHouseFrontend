import { useParams } from "react-router-dom"

export default function Edit() {

    const {id} = useParams();

    return (
        <div>
            {(id == '0')?'Select a device in the Devices page to edit': 'Edit your device'}
        </div>
    )
}
