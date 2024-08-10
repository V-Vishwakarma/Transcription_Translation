import React from 'react'

export default function FileDisplay(props) {
    const { file, audioStream, handleAudioReset, handleFormSubmission } = props



    return (
        <main className='flex-1 p-4 flex text-center pb-20 flex-col gap-3 sm:gap-3 w-72 justify-center max-w-full mx-auto sm:w-96'>

            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl '>
                Your<span className='text-blue-400'> File</span>
            </h1>
            <div className='flex flex-col text-left my-4 '>
                <h3 className='font-semibold'>Name</h3>
                <p>
                    {file ? file.name : "Custom audio"}

                </p>
            </div>
            <div className='flex items-center justify-between gap-4'>

                <button onClick={handleAudioReset} className='text-slate-400 hover:text-blue-400'>Reset</button>

                <button onClick={handleFormSubmission} className='specialBtn px-3 rounded-lg  text-blue-400 flex items-center gap-2 p-2 font-medium'>
                    <p>Transcribe</p>
                    <i className="fa-solid fa-pen-nib"></i>
                </button>
            </div>
        </main>
    )
}

