import React, { useState, useEffect, useRef } from 'react'

export default function HomePage(props) {

    const { setFile, setAudioStream } = props
    const [recordingStatus, setRecordingStatus] = useState('inactive')
    const [audioChunks, setAudioChunks] = useState([])
    const [duration, setDuration] = useState(0)

    const mediaRecorder = useRef(null)

    const mimeType = 'audio/webm'

    // recording function
    async function startRecording() {
        let tempStream
        console.log('Start Recording')
        try {
            // this line allow the user to access the media streams from the users device such as camera or microphone
            // it uses WebRTC api
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })

            tempStream = streamData
        } catch (err) {
            console.log(err.message)
            return
        }
        setRecordingStatus('recording')

        const media = new MediaRecorder(tempStream, { type: mimeType })
        mediaRecorder.current = media

        mediaRecorder.current.start()
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') { return }
            if (event.data.size == 0) { return }
            localAudioChunks.push(event.data)
        }
        setAudioChunks[localAudioChunks]
    }

    async function stopRecording() {
        setRecordingStatus('inactive')
        console.log('stop Recording')

        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType })
            setAudioStream(audioBlob)
            setAudioChunks([])
            setDuration(0)
        }
    }

    useEffect(() => {
        if (recordingStatus === 'inactive') { return }
        const interval = setInterval(() => {
            setDuration(curr => curr + 1)
        }, 1000)
        return () => clearInterval(interval)
    })


    return (
        <main className='flex-1 p-4 flex text-center pb-20 flex-col gap-3 sm:gap-3 justify-center'>

            <h1 className='font-semibold text-5xl sm:text-6xl 
            md:text-7xl '>
                Trans<span className='text-blue-400'>(ScripLate)</span>
            </h1>

            <h3 className='font-semibold md:text-lg'>Record <span
                className='text-blue-400'>
                &rarr;</span> Transcribe <span
                    className='text-blue-400'>
                    &rarr;</span>Translate</h3>

            <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className='flex justify-between text-base gap-4 items-center mx-auto w-72 max-w-full my-4
                specialBtn px-3 py-2 rounded-xl '>
                <p className='text-blue-400' >{recordingStatus === 'inactive' ? 'Record' : `Stop Recording`}</p>
                <div className="flex items-center gap-2">
                    {duration && (<p className='text-sm'>{duration}s</p>)}
                    <i className={'fa-solid fa-microphone duration-200 ' + (recordingStatus === 'recording' ? 'text-rose-300' : "")}></i>
                </div>
            </button>

            <p className='text-base'>Or
                <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'> upload
                    <input onChange={(e) => {
                        // const tempFile = e.target.files[0]
                        setFile(e.target.files[0])
                    }}
                        className='hidden' type="file" accept='.mp3,.wave'
                    />
                </label> a mp3 file
            </p>
            <p className='italic text-slate-500'>Free Now Free Forever</p>

        </main>
    )
}
