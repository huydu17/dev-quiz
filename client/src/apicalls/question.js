const { default: axiosInstance } = require(".");

//getall
export const getAllQuestions = async (payload) => {
  try {
    const response = await axiosInstance.get("/api/questions/get-all", payload);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

//getbyId
export const addQuestion = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/questions/add-question",
      payload
    );
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

//editQuestion
export const editQuestion = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/questions/update-question",
      payload
    );
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

//delete question
export const deleteQuestion = async (payload) => {
  try {
    console.log(payload);
    const response = await axiosInstance.post(
      "/api/questions/delete-question",
      payload
    );
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
