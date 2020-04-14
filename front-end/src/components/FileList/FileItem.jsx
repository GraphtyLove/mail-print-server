import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import PrintIcon from '@material-ui/icons/Print'
import ImageSearchSharpIcon from '@material-ui/icons/ImageSearchSharp'
import SECRET from '../secret/secret'

// * ----- Style: ----- *
const styleFilename = {
    fontSize: "1em",
    fontWeight: "bold",
    marginRight: 'auto',
    marginLeft: '20px'
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
    const deleteFile = (fileFolder, fileName) => {
        fetch(`http://${SECRET.ip}/delete-document/${fileFolder}/${fileName}`)
            .then(res => res.json())
            .then(setTimeout(props.fetchFiles(), 1000))
            .catch(() => setFetchError(true))
    }
    const printFile = (fileFolder, fileName) => {
        fetch(`http://${SECRET.ip}/print-document/${fileFolder}/${fileName}`)
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

                    <a href={`http://${SECRET.ip}/static/${props.fileFolder}/${props.fileName}`} target='_blank' rel="noopener noreferrer"><ImageSearchSharpIcon
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
                        onClick={() => printFile(props.fileFolder, props.fileName)}
                    />
                    <DeleteIcon
                        fontSize="large"
                        className="pointer"
                        style={{
                            color: "red",
                            marginLeft: "15px"
                        }}
                        onClick={() => deleteFile(props.fileFolder, props.fileName)}
                    />
                </div>
            </section>
            {
                ['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.pdf'].includes(props.fileName.slice(-4).toLowerCase())
                && <section className="df-center-row">
                    <a href={`http://${SECRET.ip}/static/mail_files/${props.fileName}`} target='_blank' rel="noopener noreferrer" className="df-center-row">
                        <img src={`http://${SECRET.ip}/static/thumbnails/${fileNameWithoutExtension(props.fileName)}.jpg`} alt="file preview" style={styleThumbnail} />
                    </a>
                </section>
            }
        </li >
    )
}

export default FileItem