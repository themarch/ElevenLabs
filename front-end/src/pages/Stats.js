import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { getSlice, setInitial } from '../features/dataSlice';
import AddAstronauts from '../components/AddAstronauts';

const Stats = (props) => {

    const [statsAstronauts, setStatsAstronauts] = useState()
    const [avgFlight, setAvgFlight] = useState()
    const [avgTimeFlight, setAvgTimeFlight] = useState()

    const data = useSelector(getSlice)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchData();

    }, []);

    if (data.updateData.refreshStats) {
        fetchData()
        dispatch(setInitial({refreshStats: false}))
    }

    async function getGenderStats() {
        const response = await axios.get("http://localhost:9000/stats/by-gender");
        if (response.data.status === 200) {
            const { Woman, Man } = response.data.data
            setStatsAstronauts((parseInt(Man) * 100) / (parseInt(Man) + parseInt(Woman)))
        }
    }
    
    async function getAverageFlight() {
        const response = await axios.get("http://localhost:9000/stats/average-flight");
        if (response.data.status === 200) {
            setAvgFlight(response.data.data.avgFlight)
        }
    }

    async function getAverageTimeFlight() {
        const response = await axios.get("http://localhost:9000/stats/average-time-flight");
        if (response.data.status === 200) {
            setAvgTimeFlight(response.data.data)
        }
    }

    async function fetchData() {
        await getGenderStats()
        await getAverageFlight()
        await getAverageTimeFlight()
    }
    return (
        <div className='flex flex-col md:flex-row stats pt-8 relative'>
            {data.updateData.refreshStats ?
                <></>
            : <AddAstronauts />}
            <div className='flex flex-col mt-16 m-auto mb-16 z-10'>
                <div>
                    <div className="w-[300px] iphonese:w-[350px] bg-gray-200 rounded-full h-6 dark:bg-gray-700">
                        <div className="bg-blue-600 h-6 rounded-full" style={{width: `${statsAstronauts ? statsAstronauts : 100}%`}}>
                            <p className='text-white font-semibold pl-4'> {statsAstronauts ? statsAstronauts.toFixed(2) : ""} % </p>
                        </div>
                    </div>
                    <p className='w-[300px] iphonese:w-[350px] text-white font-medium text-lg mt-8'> Ici ce n'est pas comme chez ElevenLabs, on est bien loin de la parité. <strong> {statsAstronauts ? statsAstronauts.toFixed(2) : ""} </strong> % des Astronautes sont des hommes. </p> 
                </div>
                <div className='mt-6'>
                    <p className='w-[300px] iphonese:w-[350px] text-white font-medium text-lg mt-8'> En moyenne, les Astronautes font en moyenne <strong> {avgFlight ? avgFlight.toFixed(2) : ""} </strong> vols </p> 
                </div>
                <div className='mt-6'>
                    <p className='w-[300px] iphonese:w-[350px] text-white font-medium text-lg mt-8'> Les Astronautes ont une durée moyenne de vol de <strong>{avgTimeFlight ? avgTimeFlight.toFixed(2) : ""}</strong> jours </p> 
                </div>
            </div>
            <div className="background absolute top-0 bottom-0 right-0 left-0 mix-blend-multiply">
            </div>
            <ToastContainer />
        </div>
    )
}

export default Stats