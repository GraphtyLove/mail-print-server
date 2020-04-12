import React, { useState, useEffect } from 'react'
// * ----- Components ----- *
import FileItem from './FileItem'
import CachedSharpIcon from '@material-ui/icons/CachedSharp';

const FileList = () => {
    // * ----- States: ----- *
    const [files, setFiles] = useState([])
    const [fetchError, setFetchError] = useState()
    const [isFetching, setIsFetching] = useState(false)

    // * ----- Fetch functions ----- *
    const fetchAndDlFiles = () => {
        setIsFetching(true)
        fetch('http://127.0.0.1:5000/dl-mails')
            .then(res => res.json())
            .then(data => setFiles(data))
            .then(() => setIsFetching(false))
            .catch(err => setFetchError(err))
    }
    const fetchFiles = () => {
        console.log('fetch...')
        fetch('http://127.0.0.1:5000/fetch-mails')
            .then(res => res.json())
            .then(data => setFiles(data))
            .catch(err => setFetchError(err))
    }

    // Use effects
    useEffect(() => {
        fetchAndDlFiles()
    }, [])

    return (
        <main className="container">
            <section className="df-center-row title">
                <h2 style={{ marginRight: 'auto' }}>List des fichiers:</h2>
                <CachedSharpIcon
                    fontSize="large"
                    className="pointer reverse"
                    color="primary"
                    style={
                        isFetching
                            ? {
                                color: "green",
                                animationName: "spin",
                                animationDuration: "5000ms",
                                animationIterationCount: "infinite",
                                animationTimingFunction: "linear",
                            }
                            : {
                                color: 'primary',
                            }
                    }
                    onClick={fetchAndDlFiles}
                />
            </section>
            <section>
                <ul>

                    {fetchError
                        && <p style={{ color: 'red', textAlign: 'center' }}>
                            Error while fetching the API...
                        </p>}
                    {!fetchError
                        && files
                        && files.length > 0
                        && files.map(fileName => <FileItem
                            fileName={fileName}
                            fetchFiles={() => fetchFiles()}
                            key={fileName}
                        />)}
                </ul>
            </section>
        </main>
    )
}

export default FileList