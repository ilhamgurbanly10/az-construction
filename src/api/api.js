import axios from "axios";


export const api = axios.create({
  baseURL:  `https://imat-admin.herokuapp.com/api`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null;
    config.headers["accept-language"] = localStorage.getItem("locale")
      ? localStorage.getItem("locale")
      : "az";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem("access_token");
                window.location.reload();
            } else {
                console.log('xeta')
            }
            return Promise.reject(error);
        }
    }
);

export default api;
