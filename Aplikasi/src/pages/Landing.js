import axios from "axios"
import LoadingWidget from '../components/LoadingWidget'
import { useState } from 'react'
import { errorHandlingRequest, successHandlingRequest } from '../helpers'
import { useNavigate } from "react-router-dom"
import { ReactComponent as Logo } from '../../src/assets/heartbeat.svg'

const fileData = {
    'ekg': null,
    'sample': null
}

const Landing = () => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ file, setFile ] = useState(fileData)
    const [ accuracy, setAccuracy ] = useState({})
    const [ isGenerate, setIsGenerate ] = useState(false)
    const navigate = useNavigate()

    const handleExtension = (name, value) => {
        if (name == 'ekg') {
            if (value.type != 'text/csv') return errorHandlingRequest("ECG file is csv type extension")
        }
        if (name == 'sample') {
            if (value.type != 'text/plain') return errorHandlingRequest("Sample file is txt type extension")
        }
        return
    }

    const handleFileChange = (name, value) => {
        handleExtension(name, value)
        setFile({...file, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!file.ekg || !file.sample) {
            errorHandlingRequest("Please enter the ECG and Sample file")
        } else {
            predictEkg(file)
        }
    }

    const regenerateModel = () => {
        setIsLoading(true)
        axios.get(`http://127.0.0.1:8000/generate`)
        .then( response => {
            setAccuracy(response.data)
            successHandlingRequest("Succesfully re-generate model")
        })
        .catch( () => {
            errorHandlingRequest("Error !")
        })
        .finally( () => {
            setIsGenerate(true)
            setIsLoading(false)
        })
    }

    const predictEkg = async (data) => {
        const formData = new FormData()
        formData.append("ekg", data.ekg)
        formData.append("sample", data.sample)
        setIsLoading(true)
        axios.post(`http://127.0.0.1:8000/predict`, formData)
        .then( () => {
            navigate('/result')
        })
        .catch( () => {
            errorHandlingRequest("Error !")
        })
        .finally( () => {
            setIsLoading(false)
        })
    }

    return (
        <div className='flex bg-[#21A2FF] h-screen w-screen justify-center items-center'>
            <div className="flex flex-col justify-center items-center">
                <LoadingWidget isLoading={isLoading} />
                <Logo width="150px" stroke='#FFFFFF' />
                <p className='font-bold font-poppins text-[40px] text-white mt-8'>ELECTROCARDIOGRAM</p>
                <form className='flex flex-col w-[350px] sm:w-[400px]' onSubmit={handleSubmit}>
                    <div className="mt-8">
                        <label className="block uppercase text-white text-xs font-bold font-poppins mb-2" htmlFor="grid-password">ECG</label>
                        <input 
                            className='shadow-lg drop-shadow-lg border rounded w-full py-2 px-3 text-white font-poppins placeholder:text-white focus:outline-none focus:border-2 placeholder:font-poppins focus:text-white bg-transparent' 
                            type="file"
                            accept=".csv"
                            onChange={(e) => handleFileChange('ekg', e.target.files[0])}
                        />
                    </div>
                    <div className="mt-8">
                        <label className="block uppercase text-white text-xs font-bold font-poppins mb-2" htmlFor="grid-password">SAMPLE</label>
                        <input 
                            className='shadow-lg drop-shadow-lg border rounded w-full py-2 px-3 text-white font-poppins placeholder:text-white focus:outline-none focus:border-2 placeholder:font-poppins focus:text-white bg-transparent' 
                            type="file"
                            accept=".txt"
                            onChange={(e) => handleFileChange('sample', e.target.files[0])}
                        />
                    </div>
                    <div className="mt-8">
                        <button className='shadow-lg bg-white broder rounded py-2 px-3 text-[#21A2FF] font-poppins font-bold w-full hover:bg-slate-300' type='submit'>Process</button>
                    </div>
                </form>
                <div className="mt-8">
                    { isGenerate ? (
                        <p className='text-white font-poppins font-bold xl:text-[20px] lg:text-[16px] md:text-[12px] text-[10px] text-center mb-4'>Accuracy: {accuracy.accuracy}</p>
                    ) : ''
                    }
                    <button 
                        className='shadow-lg bg-white broder rounded py-2 px-3 text-[#21A2FF] font-poppins font-bold w-full hover:bg-slate-300'
                        onClick={regenerateModel}
                    >Re-Generate Model</button>
                </div>
            </div>
        </div>
    )
}

export default Landing