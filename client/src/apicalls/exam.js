const { default: axiosInstance } = require(".");

export const addExam = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/exams/add", payload);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getAllExams = async () => {
  try {
    const response = await axiosInstance.get("/api/exams/get-all");
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(`/api/exams/get-by-id`, payload);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateExam = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/api/exams/edit/${id}`, payload);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const deleteExam = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/exams/delete/${id}`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
