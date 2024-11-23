import { axiosInstance } from "../lib/axios";
import { setDetailProjects } from "../redux/actions/DetailProjectActions";

const getReviewProjects = async (dispatch) => {
  const userId = sessionStorage.getItem("userId");
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.get(`/projectdetails/company/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setDetailProjects(response.data));    
  } catch (error) {
    console.error("Error:", error);
  }
};

export default getReviewProjects;
