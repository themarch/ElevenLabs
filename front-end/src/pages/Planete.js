import { useEffect, useState } from "react"
import axios from "axios"

function Planete() {

    const [planete, setPlanete] = useState()

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await axios.get("http://localhost:9000/stats/by-planete");
        if (response.data.status === 200)
            setPlanete(response.data.data)
    }
        
    return (
        <div className="planete h-full min-h-[500px] flex flex-col md:flex-row">
            <div className="mt-8 pl-8 md:flex md:flex-wrap md:justify-center ml-auto mr-auto">
                <div className="flex items-center md:mr-24">
                    <img alt="chat" className="w-24 h-24 mb-4" src="planete/panda.png" />
                    <p className="ml-4 text-white text-lg font-semibold"> Donut Factory : {planete && planete['Donut Factory'] ? planete['Donut Factory'] : ''} </p>
                </div>
                <div className="flex items-center md:mr-24">
                    <img alt="chat" className="w-24 h-24 mb-4" src="planete/duck.png" />
                    <p className="ml-4 text-white text-lg font-semibold"> Duck Invaders : {planete && planete['Duck Invaders'] ? planete['Duck Invaders'] : ''} </p>
                </div>
                <div className="flex items-center md:mr-24">
                    <img alt="chat" className="w-24 h-24 mb-4" src="planete/racoon.png" />
                    <p className="ml-4 text-white text-lg font-semibold"> Raccoons of Asgard : {planete && planete['Raccoons of Asgard'] ? planete['Raccoons of Asgard'] : ''} </p>
                </div>
                <div className="flex items-center">
                    <img alt="panda" className="w-24 h-24 mb-4" src="planete/cat.png" />
                    <p className="ml-4 text-white text-lg font-semibold"> Schizo Cats : {planete && planete['Schizo Cats'] ? planete['Schizo Cats'] : ''} </p>
                </div>
            </div>
        </div>
    )
}

export default Planete