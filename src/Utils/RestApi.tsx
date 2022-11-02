import axios, { Method } from "axios";
import Cookies from "js-cookie";
export const apiCaller = (
  url: string,
  data: any,
  method: Method = "get",
  options = {},
  host: any = process.env.REACT_APP_AUTH_API
): Promise<any> => {
  return axios({
    url: `${host}${url}`,
    method,
    data,
    ...options,
    headers: { Authorization: Cookies.get("authToken") || "" },
  });
};
