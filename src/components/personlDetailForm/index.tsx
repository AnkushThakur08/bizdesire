import React from "react";
import { Field, ErrorMessage } from "formik";

const PersonalDetailForm: React.FC = () => {
  return (
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
  );
};

export default PersonalDetailForm;
