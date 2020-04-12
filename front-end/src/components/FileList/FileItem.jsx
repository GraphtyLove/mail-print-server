import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import PrintIcon from '@material-ui/icons/Print'
import ImageSearchSharpIcon from '@material-ui/icons/ImageSearchSharp'

// * ----- Style: ----- *
const styleFilename = {
    fontSize: "1em",
    fontWeight: "bold",
    marginRight: 'auto'
}
const styleFileBorder = {
    borderBottom: "1px solid rgba(114, 114, 114, 0.4",
    borderRadius: "3px",
}
const styleThumbnail = {
    height: 'auto',
    width: '50%',
    margin: '50px 0',
    boxShadow: '0px 0px 9px 1px rgba(0, 0, 0, 0.4)'
}


const FileItem = props => {
    // * ----- States: ----- *
    const [fetchError, setFetchError] = useState(false)
    const [printed, setPrinted] = useState(false);

    // * ----- Fetch functions ----- *
    const deleteFile = fileName => {
        fetch(`http://127.0.0.1:5000/delete-document/${fileName}`)
            .then(res => res.json())
            .then(setTimeout(props.fetchFiles(), 1000))
            .catch(() => setFetchError(true))
    }
    const printFile = fileName => {
        fetch(`http://127.0.0.1:5000/print-document/${fileName}`)
            .then(res => res.json())
            .then(setPrinted(true))
            .then(setFetchError(false))
            .catch(() => setFetchError(true))
    }
    // * ----- File functions ----- *
    const fileNameWithoutExtension = fileName => {
        // split in an array in each .
        const fileNameSplitted = fileName.split('.')
        // Delete the last element of the array
        fileNameSplitted.pop()
        // Join the rest of the array in a string
        const filenameWithoutExtension = fileNameSplitted.join('')
        return filenameWithoutExtension
    }

    return (
        <li
            className="df-center-col"
            style={styleFileBorder}
        >
            <section style={{ width: '100%' }} className='df-center-row'>
                <p style={styleFilename}> {props.fileName} </p>
                <div className="df-center-row">
                    {
                        fetchError
                        && <p
                            style={{ color: 'red' }}
                        >
                            <b>Erreur de suppression/impression. Veuillez réessayer...</b>
                        </p>
                    }

                    <a href={`http://127.0.0.1:5000/static/mail_files/${props.fileName}`} target='_blank'><ImageSearchSharpIcon
                        fontSize="large"
                        className="pointer"
                        color="primary"
                    /></a>

                    <PrintIcon
                        fontSize="large"
                        className="pointer"
                        color="primary"
                        style={
                            printed
                                ? {
                                    color: "green",
                                    marginLeft: "15px"
                                }
                                : {
                                    marginLeft: "15px"
                                }}
                        onClick={() => printFile(props.fileName)}
                    />
                    <DeleteIcon
                        fontSize="large"
                        className="pointer"
                        style={{
                            color: "red",
                            marginLeft: "15px"
                        }}
                        onClick={() => deleteFile(props.fileName)}
                    />
                </div>
            </section>
            {
                Array('.jpg', '.jpeg', '.png', '.tif', '.tiff', '.pdf').includes(props.fileName.slice(-4).toLowerCase())
                && <section className="df-center-row">
                    <a href={`http://127.0.0.1:5000/static/mail_files/${props.fileName}`} target='_blank' className="df-center-row">
                        <img src={`http://127.0.0.1:5000/static/thumbnails/${fileNameWithoutExtension(props.fileName)}.jpg`} style={styleThumbnail} />
                    </a>
                </section>
            }
        </li >
    )
}

export default FileItem