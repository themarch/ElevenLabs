import { toast } from 'react-toastify';
import { getSlice, setInitial } from '../features/dataSlice';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

function AddAstronauts() {

    const dispatch = useDispatch()
    const dataFilled = useSelector(getSlice)
    const data = dataFilled.updateData.astronautsData

    const addAstronauts = async e => {
        e.preventDefault()
        const planete = ["Duck Invaders", "Raccoons of Asgard", "Donut Factory", "Schizo Cats"]
        const nbAleatoire = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
        const dataPost = {
          name: e.target[0].value,
          country: e.target[1].value,
          gender: e.target[2].value,
          flights: e.target[3].value ? e.target[3].value: "",
          totalFlights: e.target[4].value ? e.target[4].value : "",
          flightTime: e.target[5].value ? e.target[5].value : "",
          planete: planete[nbAleatoire]
        }
        const add = await axios.post('http://localhost:9000/astronauts', dataPost)
        if (add.data.status === 200) {
          dispatch(setInitial({astronautsData: [add.data.data, ...data], refreshStats: true}))
          toastNotif("success", '👨‍🚀 Astronaute créé !')
          e.target.reset();
        }
        else
          toastNotif("error", '👨‍🚀 Astronaute non ajouté !')
    }

    const toastNotif = (state, message) => {
        toast[state](message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          });
      }

    return (
        <>
          <div className="px-4 mb-4 sm:px-6 lg:px-8 flex flex-col z-10 md:flex-row justify-center ml-auto mr-auto md:mb-16">
              <form className='ml-auto mr-auto' onSubmit={(e) => addAstronauts(e) }>
                  <div className='flex flex-col bg-white rounded-lg px-4 py-4 w-[300px]'>
                      <p className='text-[rgb(34,70,135)] text-xl font-semibold mb-6' onClick={addAstronauts}> Ajoutons un astronaute </p>
                      <div className=''>
                      <p className='text-[rgb(34,70,135)] font-medium'> Name </p>
                      <input required className='border border-gray-400 w-full h-10 px-2' placeholder='Thomas Pesquet' />
                      </div>
                      <div className=''>
                      <p className='text-[rgb(34,70,135)] font-medium'> Country </p>
                      <input required className='border border-gray-400 w-full h-10 px-2' placeholder='France' />
                      </div>
                      <div className=''>
                      <p className='text-[rgb(34,70,135)] font-medium'> Gender </p>
                      <input required className='border border-gray-400 w-full h-10 px-2' placeholder='Homme' />
                      </div>
                      <div className=''>
                      <p className='text-[rgb(34,70,135)] font-medium'> Flights </p>
                      <input required className='border border-gray-400 w-full h-10 px-2' placeholder='Starlink' />
                      </div>
                      <div className=''>
                      <p className='text-[rgb(34,70,135)] font-medium'> Total Flights </p>
                      <input required className='border border-gray-400 w-full h-10 px-2' placeholder='3' />
                      </div>
                      <div className=''>
                      <p className='text-[rgb(34,70,135)] font-medium'> Flight Time </p>
                      <input required className='border border-gray-400 w-full h-10 px-2' placeholder='192 (en jours)' />
                      </div>
                      <button className='bg-[rgb(34,70,135)] text-white text-lg font-semibold mt-4 px-4 py-2'>
                      Ajouter l'astronaute
                      </button>
                  </div>
              </form>
      </div>
    </>
    )
}

export default AddAstronauts