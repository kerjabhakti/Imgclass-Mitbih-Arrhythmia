import axios from "axios"
import Modal from "../components/Modal"
import LoadingWidget from '../components/LoadingWidget'
import { useState, useEffect } from 'react'
import { errorHandlingRequest } from '../helpers'

const Result = () => {  
    const [ beat, setBeat ] = useState()
    const [ modal, setModal ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ plot, setPlot ] = useState()

    useEffect(() => {
        predictEkg()
    }, [])

    const predictEkg = async () => {
        setIsLoading(true)
        axios.get(`http://127.0.0.1:8000/list_beat`)
        .then( response => {
            setBeat(response.data.data)
        })
        .catch( error => {
            errorHandlingRequest("Error !");
        })
        .finally( () => {
            setIsLoading(false)
        })
    }

    const plotBeat = async (id) => {
        setIsLoading(true)
        axios.get(`http://127.0.0.1:8000/beat/${id}`)
        .then( response => {
            setPlot(response.data.plot)
        })
        .catch( () => {
            errorHandlingRequest("Error !");
        })
        .finally( () => {
            setIsLoading(false)
        })
    }

    return (
        <div className='flex'>
            <LoadingWidget isLoading={isLoading} />
            <Modal 
                title={'Plotting Beat ECG'} 
                modal={modal} 
                setModal={setModal}
                isFull={true} >
                <img src={`data:image/png;base64,${plot}`}></img>
            </Modal>
            <div className='container mx-auto'>
                <div>
                    <p className='text-primary-dark font-bold xl:text-[28px] lg:text-[24px] md:text-[20px] text-[14px] text-center mt-8'>ELECTROCARDIOGRAM</p>
                    <p className='text-primary font-bold xl:text-[28px] lg:text-[24px] md:text-[20px] text-[14px] text-center'>RESULT OF PREDICT</p>
                    <p className='text-primary font-poppins font-bold xl:text-[20px] lg:text-[16px] md:text-[12px] text-[10px] text-center'>Classes: <span className='text-primary-dark'>0 -> N | 1 -> L | 2 -> R | 3 -> A | 4 -> V</span></p>
                </div>
                <div className='flex flex-wrap bg-white rounded-md border-primary border-t-[8px] shadow-md my-8 mx-4'>
                    <div className='block w-full overflow-x-auto rounded-md'>
                        <table className='items-center w-full select-none rounded-md mb-2'>
                            <thead>
                                <tr>
                                    <th className='text-[#35589A] text-left text-xs p-3 border-b border-solid uppercase'>
                                        ID
                                    </th>
                                    <th className='text-[#35589A] text-left text-xs p-3 border-b border-solid uppercase'>
                                        Index
                                    </th>
                                    <th className='text-[#35589A] text-left text-xs p-3 border-b border-solid uppercase'>
                                        Annotation
                                    </th>
                                    <th className='text-[#35589A] text-left text-xs p-3 border-b border-solid uppercase'>
                                        Beat Plotting
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            { beat?.map( (v) => (
                                <tr className='border-b hover:bg-[#DBE5FF]' key={v.id}>
                                    <td className='text-sm text-[#35589A] p-3'>
                                        {v.id}
                                    </td>
                                    <td className='text-sm text-[#35589A] p-3'>
                                        {v.index}
                                    </td>
                                    <td className='text-sm text-[#35589A] p-3'>
                                        {v.annotation}
                                    </td>
                                    <td className='text-sm text-[#35589A] p-3'>
                                        <button onClick={() => {setModal(true); plotBeat(v.id)}}>View</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result