import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});


/* The `instance.interceptors.request.use()` function is a request interceptor that is used to modify
the outgoing request before it is sent. */
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

/* The `instance.interceptors.response.use()` function is a response interceptor that is used to handle
responses from the server. */
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    /* The code block you provided is an error handling mechanism for handling a 403 (Forbidden)
    response from the server. Tries to refresh the accessToken once, and if it fails it redirects you to the login page */
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("http://localhost:8080/api/v1/auth/refresh-token", {refreshToken: refreshToken});
        const token = response.data.accessToken;

        localStorage.setItem("accessToken", token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        console.log(error)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error) ;
  }
);

export default instance;