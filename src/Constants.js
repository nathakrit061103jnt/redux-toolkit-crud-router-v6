// unit style
export const drawerWidth = 240;

export const NODEJS_HEROKU_API_URL = "https://node-api-stock.herokuapp.com";

// server url
// export const API_URL = "http://localhost:8090";

export const API_URL = NODEJS_HEROKU_API_URL;

export const IMAGES_URL_NODE = `${API_URL}/images`;
// export const IMAGES_URL_NODE_MONGO_DB = `http://localhost:8085/images`;

// export const IMAGES_URL_FIBERGO = `http://localhost:9090`;
export const IMAGES_URL = IMAGES_URL_NODE;

// reducer constants
export const PRODUCT_REDUCER = "products";
export const AUTH_REDUCER = "auth";

// action  products
export const PRODUCT_CREATE = "PRODUCT_CREATE";
export const PRODUCT_UPDATE = "PRODUCT_UPDATE";
export const PRODUCT_DELETE = "PRODUCT_DELETE";
export const PRODUCT_GET_ALL = "PRODUCT_GET_ALL";
export const PRODUCT_GET_BYID = "PRODUCT_GET_BYID";

// action auth
export const AUTH_SIGN_IN = "AUTH_SIGN_IN";
export const AUTH_SIGN_UP = "AUTH_SIGN_UP";
export const AUTH_SIGN_OUT = "AUTH_SIGN_OUT";
export const AUTH_RE_SIGN_IN = "AUTH_RE_SIGN_IN";
export const AUTH_SIGN_IN_STATUS = "signInStatus";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

export const TOKEN_KEY = "token";
export const EMAIL_KEY = "u_email";

export const api = {
  SIGN_IN_URL: `/auth/login`,
  SIGN_UP_URL: `/auth/register`,
  PRODUCTS_URL: `/products`,
};
