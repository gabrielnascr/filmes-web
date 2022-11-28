import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { "@filmesweb.token": token } = parseCookies(ctx);
  const api = axios.create({
    baseURL: "http://localhost:3000/",
  });


  api.defaults.headers.common["Authorization"] = `Bearer ${token}`

  return api;
}
