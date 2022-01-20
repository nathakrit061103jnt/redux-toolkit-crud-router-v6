import cookies from "js-cookie";

export const setCookie = (key, value) => {
  cookies.set(key, value, { expires: 7 });
};

export const getCookie = (key) => cookies.get(key);

export const removeCookie = (key) => cookies.remove(key);
