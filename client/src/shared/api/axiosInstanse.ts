import type { AxiosError } from "axios";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
});

let accessToken = "";

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization ??= `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError & { config: { sent: boolean } }) => {
    const prev = err.config;
    if (err.status === 401 && !prev.sent) {
      prev.sent = true;
      const response = await axios.post<{ accessToken: string }>(
        "/api/auth/refresh"
      );
      accessToken = response.data.accessToken;
      prev.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(prev);
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
