const { default: axiosInstance } = require(".");
export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("api/users/register", payload);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("api/users/login", payload);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getUserInfo = async (payload) => {
  try {
    const response = await axiosInstance.get(
      "/api/users/get-user-info",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
