import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setInitial } from '../features/dataSlice';
import Table from "../components/Table";

function Astronauts() {

    const [dataUpdated, setDataUpdated] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await axios.get("http://localhost:9000/astronauts");
        if (response.data.status === 200) {
            dispatch(setInitial({astronautsData: response.data.data}))
            setDataUpdated(true)
        }
    }

    return (
        <div className="bg-[#3cbfb8] h-full">
            {dataUpdated ?
                <Table/>
            : ''}
        </div>
    )
}

export default Astronauts;