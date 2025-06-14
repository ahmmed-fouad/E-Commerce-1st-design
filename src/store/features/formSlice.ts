// app/features/formSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormInputState {
  id: string;
  url: string;
  title: string;
  discription: string;
  price: string;
  discountPercentage: string;
  rating: string;
  stock: string;
  category: string;
  [key: string]: string | File | undefined;
}

interface FormSliceState {
  formInput: FormInputState;
}

interface SetFormInputPayload {
  name: string;
  value: string;
  files?: FileList;
  type?: string;
}

const initialState: FormSliceState = {
  formInput: {
    id: "",
    url: "",
    title: "",
    discription: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    category: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormInput: (state, action: PayloadAction<SetFormInputPayload>) => {
      const { name, value, files, type } = action.payload;
      state.formInput[name] = type === "file" && files ? files[0] : value;
    },
    resetFormInput: (state) => {
      state.formInput = { ...initialState.formInput };
    },
  },
});

export const { setFormInput, resetFormInput } = formSlice.actions;
export default formSlice.reducer;
