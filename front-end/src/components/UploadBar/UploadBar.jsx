import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SECRET from '../secret/secret'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}))

const UploadBar = props => {
    // * ----- States: ----- *
    const [isFileUploaded, setIsFileUploaded] = useState('none');

    // Upload functions:
    const sendFilesToApi = event => {
        console.log('file to send: ', event.target.files[0])
        let data = new FormData()
        data.append('file', event.target.files[0])
        fetch(`http://${SECRET.ip}/upload-documents`, {
            method: 'POST',
            // Add headers to avoid cors?
            body: data
        })
            .then(() => props.fetchFiles())
            .catch(() => setIsFileUploaded('fail'))
    }

    // Material styles import
    const classes = useStyles();
    return (
        <section className="container df-center-col">
            <h2 style={{ marginRight: 'auto' }}>Uploader un fichier</h2>
            <div>
                <input
                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                            text/plain, application/pdf, image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={sendFilesToApi}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        <CloudUploadIcon style={{ marginRight: '10px' }} /> Upload
        </Button>
                </label>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
            </div>
            {(isFileUploaded === 'success') && <p>Fichier uploadé !</p>}
            {(isFileUploaded === 'fail') && <p>Erreur d'envoie...</p>}
        </section>
    )
}


export default UploadBar