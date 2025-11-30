import axiosClient from "./axios_client";

const authApi = {
  login: (data) => axiosClient.post("/signin", data),
  register: (data) => axiosClient.post("/signup", data),
};

export default authApi;
