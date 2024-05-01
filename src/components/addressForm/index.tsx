import React from "react";
import { Field, ErrorMessage } from "formik";

interface IAddressFormProps {
  sameAsResidential: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressForm: React.FC<IAddressFormProps> = ({ sameAsResidential, handleCheckboxChange }) => {
  return (
    <>
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
    </>
  );
};

export default AddressForm;
