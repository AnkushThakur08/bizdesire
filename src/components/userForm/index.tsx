import React, { useState } from "react";
import { Field, Form, FormikProvider, useFormik, ErrorMessage } from "formik";
import { differenceInYears } from "date-fns";
import { IuserFormRequest } from "../../utils/IUserFormRequest";
import * as Yup from "yup";
import PersonalDetailForm from "../personlDetailForm";
import AddressForm from "../addressForm";
import DocumentUploadForm from "../documentUploadForm";

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
            <PersonalDetailForm />

            <AddressForm handleCheckboxChange={handleCheckboxChange} sameAsResidential={sameAsResidential} />

            <DocumentUploadForm selectedFile={selectedFile} handleChange={userForm.handleChange} handleFileChange={handleFileChange} />

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
