import React, { useContext } from 'react';
import { Upload, message, Button } from 'antd';
import UploadFile from './mutations/UploadFile';

export default function Home(props1) {

    const props = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload(file, fileList) {
            console.log("beforeUpload:", file, fileList);
        },
        customRequest({
            action,
            data,
            file,
            filename,
            headers,
            onError,
            onProgress,
            onSuccess,
            withCredentials,
        }) {
            const inputs = { [filename]: null }
            const uploadables = { [filename]: file }
            UploadFile.commit(
                props1.environment,
                inputs,
                uploadables,
                (response, errors) => {
                    if (errors) {
                        onError(errors, response);
                    } else {
                        onSuccess(response);
                    }
                },
                onError
            )
            return false;
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Upload {...props}>
            <Button>Click to Upload</Button>
        </Upload>
    )
}




