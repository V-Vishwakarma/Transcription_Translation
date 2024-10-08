import React, { useState } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {

    const [tab, setTab] = useState('transcription')
    return (
        <main className='flex-1 p-4 flex text-center pb-20 flex-col gap-3 sm:gap-3 justify-center mx-auto max-w-prose w-full '>

            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl whitespace-nowrap'>
                Your<span className='text-blue-400'> Transcription</span>
            </h1>

            <div className='grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center'>
                <button onClick={() => setTab('transcription')}
                    className=
                    {'px-4 py-1 font-medium duration-200 ' +
                        (tab === 'transcription' ?
                            'bg-blue-400 text-white' :
                            'text-blue-400 hover:text-blue-600')}>
                    Transcription
                </button>
                <button onClick={() => setTab('translation')}
                    className=
                    {'px-4 py-1 font-medium duration-200 ' +
                        (tab === 'translation' ?
                            'bg-blue-400 text-white' :
                            'text-blue-400 hover:text-blue-600')}
                >Translation
                </button>
            </div>
            {tab === 'transcription' ? <Transcription /> : <Translation />}

        </main>
    )
}
