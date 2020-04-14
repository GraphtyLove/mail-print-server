import React, { Fragment, useState } from 'react';
import './App.css';
import SERVER_IP from './components/secret/secret'

// * ----- Components ----- *
import Header from './components/Header/Header'
import FileList from './components/FileList/FileList'
import Footer from './components/Footer/Footer'
import UploadBar from './components/UploadBar/UploadBar'

function App() {
    // * ----- States: ----- *
    const [files, setFiles] = useState({})
    const [fetchError, setFetchError] = useState(false)
    const [isFetching, setIsFetching] = useState(false)

    // * ----- Fetch: ----- *
    const fetchFiles = () => {
        console.log('fetch...')
        fetch(`http://${SERVER_IP}/fetch-documents`)
            .then(res => res.json())
            .then(data => setTimeout(() => setFiles(data), 1000))
            .catch(err => setFetchError(err))
    }
    const fetchAndDlFiles = () => {
        setIsFetching(true)
        fetch(`http://${SERVER_IP}/dl-mails`)
            .then(res => res.json())
            .then(data => { setFiles(data) })
            .then(() => setIsFetching(false))
            .catch(err => setFetchError(err))
    }

    return (
        <Fragment>
            <Header />
            <UploadBar
                fetchFiles={fetchFiles}
            />
            <FileList
                files={files}
                fetchError={fetchError}
                isFetching={isFetching}
                setIsFetching={setIsFetching}
                fetchAndDlFiles={fetchAndDlFiles}
                fetchFiles={fetchFiles}
            />
            <Footer />
        </Fragment>
    );
}

export default App;
