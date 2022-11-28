import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { "@filmesweb.token": token } = parseCookies(ctx);
  const api = axios.create({
    baseURL: "https://filmesapi-xp.herokuapp.com/",
  });

  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return api;
}
