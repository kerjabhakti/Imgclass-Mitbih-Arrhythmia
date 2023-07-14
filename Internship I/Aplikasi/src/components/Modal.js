import { useState, useEffect } from 'react'

const Modal = ({children, title, modal, setModal, isFull, func}) => {
    useEffect(() => {

    }, [])

    const onBackHandle = () => {
        setModal(false)
        if (typeof(func) === 'function') {
            func()
        }
    }

    return (
        <>
            { modal ? (
                <>
                    <div className='flex items-center justify-center md:w-full max-w-xl mx-auto px-2 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                        <div className={'flex flex-col bg-white rounded-lg' + (isFull ? ' w-full' : '')}>
                            <div className='flex justify-between border-b border-solid border-slate-200 rounded-t p-5'>
                                <p className='font-poppins font-semibold text-3xl text-[#35589A]'>{title}</p>
                                <button className='font-semibold text-red-500 text-3xl leading-none mx-4' onClick={() => onBackHandle()} >x</button>
                            </div>
                            {children}
                        </div>
                    </div>
                    <div className='opacity-50 fixed inset-0 z-40 bg-black'></div>
                </>
            ) : ''}
        </>
    )
}

export default Modal