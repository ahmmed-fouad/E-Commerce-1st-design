import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface RootState {
  user: {
    searchValue: string;
    SelectedValue: string;
    ifAdmin: string;
  };
  form: {
    formInput: Record<string, any>;
  };
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

type ProductsResponse = {
  products: Product[];
  total: number;
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => "products",
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products' as const, id: 'LIST' },
            ]
          : [{ type: 'Products' as const, id: 'LIST' }],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: "products/add",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [{ type: 'Products' as const, id: 'LIST' }],
    }),
    updateProduct: builder.mutation<Product, Partial<Product> & { id: number }>({
      query: ({ id, ...updatedProduct }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products' as const, id }],
    }),
    deleteProduct: builder.mutation<{ id: number; deleted: boolean }, { id: number }>({
      query: ({ id }) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Products' as const, id },
        { type: 'Products' as const, id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
