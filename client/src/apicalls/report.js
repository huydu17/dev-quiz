const { default: axiosInstance } = require(".");

//getAll
export const getAllReports = async () => {
  try {
    const response = await axiosInstance.get("/api/reports/get-all");
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
export const addReport = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/reports/add-report",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getReportsByUser = async (payload) => {
  try {
    const response = await axiosInstance.get(
      "/api/reports/get-report-by-user",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
