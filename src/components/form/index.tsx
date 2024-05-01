import React, { useState } from "react";
import { Field, Form, FormikProvider, useFormik, ErrorMessage } from "formik";
import { differenceInYears } from "date-fns";
import { IuserFormRequest } from "../../utils/IUserFormRequest";
import * as Yup from "yup";

const UserForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sameAsResidential, setSameAsResidential] = useState<boolean>(false);

  const initialValues: IuserFormRequest = {
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    street1: "",
    street2: "",
    sameAsResidential: false,
    permanentStreet1: "",
    permanentStreet2: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    dob: Yup.date().test("dob", "Should be greater than 18", function (value) {
      if (value) {
        return differenceInYears(new Date(), new Date(value)) >= 18;
      }
      return false;
    }),
    street1: Yup.string().required("Street 1 is required"),
    street2: Yup.string().required("Street 2 is required"),
  });

  const userForm = useFormik<IuserFormRequest>({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: IuserFormRequest) => {
      console.log("handleSubmit Works");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Handle file upload logic here
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSameAsResidential(event.target.checked);
    if (event.target.checked) {
      userForm.setFieldValue("permanentStreet1", userForm.values.street1);
      userForm.setFieldValue("permanentStreet2", userForm.values.street2);
    } else {
      userForm.setFieldValue("permanentStreet1", "");
      userForm.setFieldValue("permanentStreet2", "");
    }
  };

  console.log(userForm);
  return (
    <>
      <div>
        <h1 className="text-4xl font-semibold mb-6">React JS Machine Test</h1>
        <FormikProvider value={userForm}>
          <Form onSubmit={userForm.handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="flex align-start font-bold" htmlFor="firstName">
                  First Name
                </label>
                <Field className="border-2 p-2" id="firstName" name="firstName" placeholder="Enter your first name here." />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-left" />
              </div>

              <div className="flex flex-col">
                <label className="flex align-start font-bold" htmlFor="lastName">
                  Last Name
                </label>
                <Field className="border-2 p-2" id="lastName" name="lastName" placeholder="Enter your last name here." />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-left" />
              </div>

              <div className="flex flex-col">
                <label className="flex align-start font-bold" htmlFor="email">
                  Email
                </label>
                <Field className="border-2 p-2" id="email" name="email" placeholder="myname@example.com" type="email" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-left" />
              </div>

              <div className="flex flex-col">
                <label className="flex align-start font-bold" htmlFor="dateOfBirth">
                  Date of Birth
                </label>
                <Field className="border-2 p-2" id="dob" name="dob" placeholder="YYYY-MM-DD" type="date" />
                <ErrorMessage name="dob" component="div" className="text-red-500 text-left" />
              </div>
            </div>
            <h1 className="flex align-start mt-6 font-bold">Resident area</h1>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="flex align-start" htmlFor="street1">
                  Street 1
                </label>
                <Field className="border-2 p-2" id="street1" name="street1" placeholder="Enter your street address (line 1)." />
                <ErrorMessage name="street1" component="div" className="text-red-500 text-left" />
              </div>
              <div className="flex flex-col">
                <label className="flex align-start" htmlFor="street2">
                  Street 2
                </label>
                <Field className="border-2 p-2" id="street2" name="street2" placeholder="Enter your street address (line 2)." />
                <ErrorMessage name="street2" component="div" className="text-red-500 text-left" />
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <Field
                className="border-2 p-2"
                id="permanentAddress"
                name="permanentAddress"
                type="checkbox"
                checked={sameAsResidential}
                onChange={handleCheckboxChange}
              />
              <label className="flex align-start" htmlFor="permanentAddress">
                Same as Residential area
              </label>
            </div>

            <h1 className="flex align-start font-bold mt-4">Permanent Address</h1>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="flex align-start" htmlFor="permanentStreet1">
                  Street 1
                </label>
                <Field
                  className="border-2 p-2"
                  id="permanentStreet1"
                  name="permanentStreet1"
                  placeholder="Enter your street address (line 1)."
                  disabled={sameAsResidential}
                />
              </div>
              <div className="flex flex-col">
                <label className="flex align-start" htmlFor="permanentStreet2">
                  Street 2
                </label>
                <Field
                  className="border-2 p-2"
                  id="permanentStreet2"
                  name="permanentStreet2"
                  placeholder="Enter your street address (line 2)."
                  disabled={sameAsResidential}
                />
              </div>
            </div>
            <h1 className="flex align-start font-bold mt-4">Upload Documents</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="flex align-start" htmlFor="fileName">
                  File Name
                </label>
                <Field className="border-2 p-2" id="fileName" name="documents.fileName" placeholder="Enter file name" />
              </div>
              <div className="flex flex-col">
                <label className="flex align-start" htmlFor="fileType">
                  Type of File
                </label>
                <Field as="select" className="border-2 p-2" id="fileType" name="documents.fileType" placeholder="Select file type">
                  <option value="">Select file type</option>
                  <option value="PDF">PDF</option>
                  <option value="Word">Word</option>
                  <option value="Image">Image</option>
                </Field>
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
                  <input id="uploadFile" name="uploadFile" type="file" className="hidden" onChange={handleFileChange} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="flex align-start" htmlFor="fileName">
                  File Name
                </label>
                <Field className="border-2 p-2" id="fileName" name="documents.fileName" placeholder="Enter file name" />
              </div>
              <div className="flex flex-col">
                <label className="flex align-start" htmlFor="fileType">
                  Type of File
                </label>
                <Field as="select" className="border-2 p-2" id="fileType" name="documents.fileType" placeholder="Select file type">
                  <option value="">Select file type</option>
                  <option value="PDF">PDF</option>
                  <option value="Word">Word</option>
                  <option value="Image">Image</option>
                </Field>
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
                  <input id="uploadFile" name="uploadFile" type="file" className="hidden" onChange={handleFileChange} />
                </div>
              </div>
            </div>
            <button className="p-4 bg-black text-white m-8 text-xl" type="submit">
              Submit
            </button>
          </Form>
        </FormikProvider>
      </div>
    </>
  );
};

export default UserForm;
