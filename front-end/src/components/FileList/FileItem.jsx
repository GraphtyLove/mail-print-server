import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import PrintIcon from '@material-ui/icons/Print'
import ImageSearchSharpIcon from '@material-ui/icons/ImageSearchSharp'

// * ----- Style: ----- *
const styleFilename = {
    fontSize: "1.5rem",
    fontWeight: "bold"
}
const styleFileBorder = {
    borderBottom: "1px solid rgba(114, 114, 114, 0.4",
    borderRadius: "3px"
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
        const filenameWihtoutExtension = fileNameSplitted.join('')
        return filenameWihtoutExtension
    }

    return (
        <li
            className="df-center-row"
            style={styleFileBorder}
        >
            <p style={styleFilename}> {props.fileName} </p>

            {
                fetchError
                    && <p
                        style={{ color: 'red', marginLeft: "auto" }}
                    >
                        <b>Erreur de suppression/impression. Veuillez réessayer...</b>
                    </p>
            }
            
            <img src={`http://127.0.0.1:5000/static/thumnail/${fileNameWithoutExtension(props.fileName)}.jpg`}

            <ImageSearchSharpIcon
                fontSize="large"
                className="pointer"
                color="primary"
                style={{ marginLeft: "auto" }}
            />
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
        </li>
    )
}

export default FileItem