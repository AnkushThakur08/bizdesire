import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IuserFormRequest } from "../../../utils/IUserFormRequest";

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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IuserFormRequest>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
