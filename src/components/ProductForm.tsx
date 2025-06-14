// components/main/ProductForm.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../store/services/productsApi";
import { setFormInput, resetFormInput } from "../store/features/formSlice";
import { addProdInputs } from "../lib/data";
import { RootState } from "../store/services/productsApi";
import { Product } from "../store/services/productsApi";

interface ProductFormProps {
  mode?: "add" | "edit";
  defaultValues?: Partial<Product>;
}

interface FormInput {
  [key: string]: string | number | File | null;
}

const ProductForm = ({ mode = "add", defaultValues = {} }: ProductFormProps) => {
  const dispatch = useDispatch();
  const formInput = useSelector((state: RootState) => state.form.formInput);

  const [
    addProduct,
    { isLoading: isAdding, isSuccess: isAddSuccess, error: addError },
  ] = useAddProductMutation();

  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdSuccess, error: updError },
  ] = useUpdateProductMutation();

  const [localState, setLocalState] = useState<Partial<Product>>({});

  // Fill form with default values in edit mode
  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      setLocalState(defaultValues);
    }
  }, [mode, defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (mode === "edit") {
      setLocalState((prev) => ({
        ...prev,
        [name]: type === "file" ? (files?.[0] || null) : value,
      }));
    } else {
      dispatch(setFormInput({ name, value, files: files || undefined, type }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (mode === "edit") {
        await updateProduct({
          ...localState,
          id: parseFloat(String(localState.id)),
          price: parseFloat(String(localState.price)),
          discountPercentage: parseFloat(String(localState.discountPercentage)),
          rating: parseFloat(String(localState.rating)),
          stock: parseFloat(String(localState.stock)),
        }).unwrap();
      } else {
        await addProduct({
          ...formInput,
          id: parseFloat(String(formInput.id)),
          price: parseFloat(String(formInput.price)),
          discountPercentage: parseFloat(String(formInput.discountPercentage)),
          rating: parseFloat(String(formInput.rating)),
          stock: parseFloat(String(formInput.stock)),
        }).unwrap();
        dispatch(resetFormInput());
      }
    } catch (err) {
      console.error("Error submitting product:", err);
    }
  };

  const values = mode === "edit" ? localState : formInput;
  const isSuccess = mode === "edit" ? isUpdSuccess : isAddSuccess;
  const isLoading = mode === "edit" ? isUpdating : isAdding;
  const error = mode === "edit" ? updError : addError;

  return (
    <form onSubmit={handleSubmit} className="px-3 text-white space-y-1 mt-5">
      {addProdInputs.map((input) => (
        <label
          key={input.id}
          className="flex flex-col gap-1 focus-within:text-[#f26522] hover:text-[#f26522] duration-700 border-b pb-3 border-gray-700"
        >
          {input.lable}
          <input
            required
            disabled={input.name === "url"}
            name={input.name}
            type={input.type}
            value={String((values as Record<string, any>)[input.name] || "")}
            onChange={handleChange}
            placeholder={input.plcHold}
            className="text-white no-spinner bg-gray-700 px-2 py-1 outline-none rounded disabled:opacity-60"
          />
        </label>
      ))}

      <button
        type="submit"
        className="hover:bg-[#f26522] cursor-pointer text-white h-9 text-center px-8 py-1 font-bold rounded bg-gray-700 capitalize text-xs w-full"
      >
        {isLoading
          ? mode === "edit"
            ? "Updating..."
            : "Adding..."
          : mode === "edit"
          ? "Update Product"
          : "Add Product"}
      </button>

      {error && <p className="text-red-400 text-sm">Error: {String(error)}</p>}
      {isSuccess && (
        <p className="text-green-400 text-sm">
          {mode === "edit" ? "Product updated!" : "Product added!"}
        </p>
      )}
    </form>
  );
};

export default ProductForm;
