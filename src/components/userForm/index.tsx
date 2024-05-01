import React, { useState, useEffect } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { differenceInYears } from "date-fns";
import { IuserFormRequest } from "../../utils/IUserFormRequest";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";
import { collection, getDocs } from "firebase/firestore";

import * as Yup from "yup";
import PersonalDetailForm from "../personlDetailForm";
import AddressForm from "../addressForm";
import DocumentUploadForm from "../documentUploadForm";
import { db } from "../../firebase/firebase.config";

const UserForm: React.FC = () => {
  const [userData, setUserData] = useState<any>([]);
  const dispatch = useDispatch();
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
    fileName: "",
    fileType: "",
    fileName2: "",
    fileType2: "",
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
    fileName: Yup.string().required("File name is required"),
    fileType: Yup.string().required("File type is required"),
    fileName2: Yup.string().required("File name is required"),
    fileType2: Yup.string().required("File type is required"),
  });

  const userForm = useFormik<IuserFormRequest>({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: IuserFormRequest) => {
      dispatch(setUser(values));
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
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

  async function fetchDataFromFirebase() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data: any = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirebase();
      setUserData(data);
    }
    fetchData();
  }, [userData]);

  return (
    <>
      <div>
        <h1 className="text-4xl font-semibold mb-6">React JS Machine Test</h1>
        <FormikProvider value={userForm}>
          <Form onSubmit={userForm.handleSubmit}>
            <PersonalDetailForm />

            <AddressForm handleCheckboxChange={handleCheckboxChange} sameAsResidential={sameAsResidential} />

            <DocumentUploadForm values={userForm.values} selectedFile={selectedFile} handleFileChange={handleFileChange} />
            <button className="p-4 bg-black text-white m-8 text-xl" type="submit">
              Submit
            </button>

            {userData && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resident Street Address 1
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resident Street Address 2
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permanent Street Address 1
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permanent Street Address 2
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name-1</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Type-1</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name-2</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Type-2</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.map((user: IuserFormRequest) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.dob}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.street1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.street2}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.permanentStreet1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.permanentStreet2}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.fileName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.fileType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.fileName2}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.fileType2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Form>
        </FormikProvider>
      </div>
    </>
  );
};

export default UserForm;
