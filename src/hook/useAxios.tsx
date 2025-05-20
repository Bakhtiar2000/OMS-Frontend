import axios from "axios";
// import { getNewAccessToken } from "../utils/GetNewAccessToken";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5005/api/v1",
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

// axiosSecure.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.data.message.toLowerCase().includes("unauthorized") &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const response = await getNewAccessToken();
//         const accessToken = response?.data?.accessToken;

//         if (accessToken) {
//           localStorage.setItem("token", accessToken);
//           originalRequest.headers["Authorization"] = accessToken;
//           return axiosSecure(originalRequest);
//         } else {
//           // If no access token, logout
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           window.location.href = "/";
//           return Promise.reject(error);
//         }
//       } catch (refreshError) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosSecure;
