
import { useState } from "react";
import UploadService from "../../services/fileUpload.service";
import Swal from "sweetalert2";

const FileUpload: React.FC = () => {
    const [currentFile, setCurrentFile] = useState<File>();
    const [progress, setProgress] = useState<number>(0);

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);
        setProgress(0);
    };

    const upload = () => {
        setProgress(0);
        if (!currentFile) return;

        UploadService.upload(currentFile, (event: any) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: response.data.message
                })
            })
            .then(() => {
                console.log("uploaded");
                
            })
            .catch((err) => {
                setProgress(0);

                if (err.response && err.response.data && err.response.data.message) {
                    Swal.fire({
                        icon: 'error',
                        title: err.response.data.message
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "Could not upload the File!"
                    })
                }

                setCurrentFile(undefined);
            });
    };

    return (
        <div>
            <div className="row form-group">
                <div className="col-4">
                </div>
                <div className="col-8">
                    <h5>Upload Excel File</h5>                        
                </div>
            </div>
            <div className="row form-group">
                <div className="col-4">
                    <label>
                        Select File: 
                    </label>
                </div>
                <div className="col-8">
                    <input type="file" className="" onChange={selectFile} />
                </div>
            </div>
            <div className="row form-group">
                <div className="col-4"></div>
                <div className="col-8">
                    <button
                        className="btn btn-success btn-block"
                        disabled={!currentFile}
                        onClick={upload}
                    >
                        Upload
                    </button>
                </div>
            </div>

            {currentFile && (
                <div className="progress my-3">
                    <div
                        className="progress-bar progress-bar-info"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: progress + "%" }}
                    >
                        {progress}%
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;