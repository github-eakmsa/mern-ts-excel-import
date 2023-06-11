import { api } from "../config/axios";

const upload = (file: File, onUploadProgress: any): Promise<any> => {
    let formData = new FormData();

    formData.append("file", file);

    return api.post("/v1/works/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};


const UploadService = { upload };

export default UploadService;