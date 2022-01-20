import httpClient from "../utils/httpClient";
import { api } from "../Constants";

const getAll = () => {
  return httpClient.get(api.PRODUCTS_URL);
};

const get = (id) => {
  return httpClient.get(`${api.PRODUCTS_URL}/${id}`);
};

const create = (data) => {
  return httpClient.post(api.PRODUCTS_URL, data);
};

const update = (id, data) => {
  return httpClient.put(`${api.PRODUCTS_URL}/${id}`, data);
};

const remove = (id) => {
  return httpClient.delete(`${api.PRODUCTS_URL}/${id}`);
};

const ProductService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ProductService;
