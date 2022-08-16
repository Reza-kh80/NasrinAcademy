import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomInput, FormGroup, Label } from 'reactstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
const FileUpload = (props) => {
    let [fileInputError, setFileInputError] = useState('');
    let [fileName, setFileName] = useState('');
    let [loaded, setLoaded] = useState(0);
    let [loading, setloading] = useState(false);
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const { postMethod, title, specifiedFileName, accept, onUpload, disabled } = props;
    const validateFile = (e) => {
        let error = "";
        if (e.target.files[0] !== null && e.target.files[0] !== undefined) {
            var fileExtension = e.target.files[0].name.split('.').pop();
            if (accept.includes(fileExtension)) {
                error = "";
            }
            else {
                error = `file format is not accepted: accepted (${accept})`;
            }
        }
        else {
            error = "you did not select any file";
        }
        return error;
    }
    useEffect(() => {
    }, []);
    const fileUpload = (e) => {
        setLoaded(0)
        setloading(true)
        const data = new FormData()
        if (e.target.files[0] !== null) {
            setFileName(e.target.files[0].name)
            if (specifiedFileName === 'NoName') {
                data.append('file', e.target.files[0])
                onUpload(e.target.files[0].name)
            }
            else {
                let suffix = e.target.files[0].name.split('.').pop();
                let newFileName = specifiedFileName + '.' + suffix;
                let newFile = new File([e.target.files[0]], newFileName);
                data.append('file', newFile);
                onUpload(newFileName);
            }
            const option = {

                onUploadProgress: ProgressEvent => {
                    setLoaded((ProgressEvent.loaded / ProgressEvent.total * 100))
                }
            }
            axios.post(apiEndPoint + postMethod, data, option,
            )
                .then(response => {
                    setloading(false);
                    alert(response.data);
                    setFileName("");
                });
        }
        else {
            onUpload('')
        }
    }
    const handleUpload = (e) => {
        let errorMassage = validateFile(e);
        if (errorMassage === '') {
            fileUpload(e);
            setFileInputError('');
        }
        else {
            setFileInputError(errorMassage);
            return;
        }
    }
    return (<div>
        <FormGroup>
            <Label for="exampleCustomFileBrowser" className="text-primary">{title}</Label>
            <CustomInput type="file" className='text-left'
                label={fileName}
                id="exampleCustomFileBrowser"
                name="MediaName"
                onChange={handleUpload}
                disabled={disabled ? disabled : false}
            />
        </FormGroup>
        {loading && <ProgressBar className="mt-1" now={loaded} label={`${loaded}%`} />}
        {fileInputError !== "" && <div className="alert alert-danger mt-1">{fileInputError}</div>}
    </div>);
}

export default FileUpload;