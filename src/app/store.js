import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../features/products/productSlice";
import authReducer from "../features/Auth/authSlice";

import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
  },
});
