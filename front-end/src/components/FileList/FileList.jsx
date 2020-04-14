import React, { useState, useEffect } from 'react'
// * ----- Components ----- *
import FileItem from './FileItem'
import CachedSharpIcon from '@material-ui/icons/CachedSharp';
import Switch from '@material-ui/core/Switch';

const FileList = props => {
    // * ----- States: ----- *
    const [showMails, setShowMails] = useState(false)

    // Use effects
    useEffect(() => {
        props.fetchAndDlFiles()
    }, [])

    return (
        <main className="container">
            <section className="df-center-row title">
                <h2 style={{ marginRight: 'auto' }}>List des fichiers:</h2>
                <CachedSharpIcon
                    fontSize="large"
                    className="pointer reverse"
                    style={
                        props.isFetching
                            ? {
                                color: "green",
                                animationName: "spin",
                                animationDuration: "5000ms",
                                animationIterationCount: "infinite",
                                animationTimingFunction: "linear",
                            }
                            : {
                                color: '#3F51B5',
                            }
                    }
                    onClick={props.fetchAndDlFiles}
                />
            </section>
            <section>
                <div className="df-center-row">
                    <h3>
                        Envoyé par mail
                    <Switch
                            checked={showMails}
                            onChange={() => setShowMails(!showMails)}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    Uploadé sur le site
                </h3>
                </div>

                <ul>
                    {props.CachedSharpIconfetchError
                        && <p style={{ color: 'red', textAlign: 'center' }}>
                            Error while fetching the API...
                        </p>}
                    {!showMails
                        && props.files.mails
                        && props.files.mails.length > 0
                        && props.files.mails.map(fileName => <FileItem
                            fileName={fileName}
                            fetchFiles={() => props.fetchFiles()}
                            fileFolder="mail_files"
                            key={fileName}
                        />)}
                    {showMails
                        && props.files.uploads
                        && props.files.uploads.length > 0
                        && props.files.uploads.map(fileName => <FileItem
                            fileName={fileName}
                            fetchFiles={() => props.fetchFiles()}
                            fileFolder="upload_files"
                            key={fileName}
                        />)}
                </ul>
                <ul>

                </ul>
            </section>
        </main>
    )
}

export default FileList