import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductDataService from "../../services/ProductService";
import {
  PRODUCT_REDUCER,
  PRODUCT_CREATE,
  PRODUCT_DELETE,
  PRODUCT_GET_ALL,
  PRODUCT_UPDATE,
} from "../../Constants";

const initialState = [];

export const createProduct = createAsyncThunk(
  PRODUCT_CREATE,
  async (payload) => {
    try {
      const { p_name, p_price, p_count, p_image } = payload;
      let formData = new FormData();
      formData.append("p_image", p_image);
      formData.append("p_name", p_name);
      formData.append("p_price", p_price);
      formData.append("p_count", p_count);
      const { data } = await ProductDataService.create(formData);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export const getAllProducts = createAsyncThunk(PRODUCT_GET_ALL, async () => {
  try {
    const { data } = await ProductDataService.getAll();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
});

export const updateProduct = createAsyncThunk(
  PRODUCT_UPDATE,
  async ({ id, payload }) => {
    try {
      const { p_name, p_price, p_count, p_image } = payload;
      let formData = new FormData();
      formData.append("p_image", p_image);
      formData.append("p_name", p_name);
      formData.append("p_price", p_price);
      formData.append("p_count", p_count);
      const { data } = await ProductDataService.update(id, formData);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  PRODUCT_DELETE,
  async ({ id }) => {
    try {
      const { data } = await ProductDataService.remove(id);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const productsSlice = createSlice({
  name: PRODUCT_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        const { payload } = action;
        const { result } = payload;
        state.push(result);
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { payload } = action;
        const { result } = payload;
        const index = state.findIndex((product) => product.id === result.id);
        state[index] = {
          ...state[index],
          ...result,
        };
        return state;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        let index = state.findIndex(({ id }) => id === action.meta.arg.id);
        state.splice(index, 1);
      });
  },
});

const { reducer } = productsSlice;
export default reducer;
