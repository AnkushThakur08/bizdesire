import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IuserFormRequest } from "../../../utils/IUserFormRequest";
import { db } from "../../../firebase/firebase.config.tsx";
import { addDoc, collection } from "firebase/firestore";

const initialState: IuserFormRequest = {
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

async function addDataToFireStore(newData: IuserFormRequest) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      firstName: newData.firstName,
      lastName: newData.lastName,
      email: newData.email,
      dob: newData.dob,
      street1: newData.street1,
      street2: newData.street2,
      sameAsResidential: newData.sameAsResidential,
      permanentStreet1: newData.permanentStreet1,
      permanentStreet2: newData.permanentStreet2,
      fileName: newData.fileName,
      fileType: newData.fileType,
      fileName2: newData.fileName2,
      fileType2: newData.fileType2,
    });
    console.log(docRef, "TRUE");
  } catch (error) {
    console.log(error);
  }
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IuserFormRequest>) => {
      const newState = { ...state, ...action.payload };
      addDataToFireStore(newState);
      return newState;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
