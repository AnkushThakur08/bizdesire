import React from "react";
import { Field, ErrorMessage } from "formik";

interface IDocumentUploadFormProps {
  values: {
    fileType: string;
    fileType2: string;
  };
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
}

const DocumentUploadForm: React.FC<IDocumentUploadFormProps> = ({ handleFileChange, selectedFile, values }) => {
  console.log(values, "check");
  console.log(selectedFile, "selectedFile");

  return (
    <>
      <div>
        <h1 className="flex align-start font-bold mt-4">Upload Documents</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="flex align-start" htmlFor="fileName">
              File Name
            </label>
            <Field className="border-2 p-2" id="fileName" name="fileName" placeholder="Enter file name" />
            <ErrorMessage name="fileName" component="div" className="text-red-500 text-left" />
          </div>

          <div className="flex flex-col">
            <label className="flex align-start" htmlFor="fileType">
              Type of File
            </label>
            <Field as="select" className="border-2 p-2" id="fileType" name="fileType" placeholder="Select file type">
              <option value="">Select file type</option>
              <option value="PDF">PDF</option>
              <option value="Img">Image</option>
            </Field>
            <ErrorMessage name="fileType" component="div" className="text-red-500 text-left" />
          </div>

          <div className="flex flex-col">
            <label className="flex align-start">Upload Document</label>
            <div className="border-2 p-2 flex justify-between items-center">
              <span>{selectedFile ? selectedFile.name : "No file chosen"}</span>
              <label htmlFor="uploadFile" className="ml-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </label>
              <input
                id="uploadFile"
                name="uploadFile"
                type="file"
                className="hidden"
                accept={values.fileType === "PDF" ? ".pdf" : values.fileType === "Img" ? ".png" : ""}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="flex align-start" htmlFor="fileName2">
              File Name
            </label>
            <Field className="border-2 p-2" id="fileName2" name="fileName2" placeholder="Enter file name" />
            <ErrorMessage name="fileName2" component="div" className="text-red-500 text-left" />
          </div>
          <div className="flex flex-col">
            <label className="flex align-start" htmlFor="fileType2">
              Type of File
            </label>
            <Field as="select" className="border-2 p-2" id="fileType2" name="fileType2" placeholder="Select file type">
              <option value="">Select file type</option>
              <option value="PDF">PDF</option>
              <option value="Image">Image</option>
            </Field>
            <ErrorMessage name="fileType2" component="div" className="text-red-500 text-left" />
          </div>

          <div className="flex flex-col">
            <label className="flex align-start">Upload Document</label>
            <div className="border-2 p-2 flex justify-between items-center">
              <span>{selectedFile ? selectedFile.name : "No file chosen"}</span>
              <label htmlFor="uploadFile" className="ml-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </label>
              <input
                id="uploadFile"
                name="uploadFile"
                type="file"
                className="hidden"
                accept={values.fileType2 === "PDF" ? ".pdf" : values.fileType === "Img" ? ".png" : ""}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentUploadForm;
