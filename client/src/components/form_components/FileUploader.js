// https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react

//this example uses Hooks
import React, { useRef } from 'react';

const FileUploader = ({ onFileSelect }) => {

    const fileInput = useRef(null);

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        console.log("file", file);
        if (file.size > 1024)
          onFileSelectError({ error: "File size cannot exceed more than 1MB" });
          else onFileSelectSuccess(file);
      };

      const onFileSelectError = (error) => {
          console.log("error ", error);
      }

      const onFileSelectSuccess = (file) => {
          console.log("success ", file);
      }

    return (
        <div className="file-uploader">
        <input type="file" onChange={handleFileInput} />
        <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary" >
        Validate
        </button>
        </div>
    )
}

export { FileUploader };