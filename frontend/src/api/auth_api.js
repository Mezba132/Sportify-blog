import axiosClient from "./axios_client";

const authApi = {
  login: (data) => axiosClient.post("/auth/signin", data),
  register: (data) => axiosClient.post("/auth/signup", data),
};

export default authApi;
