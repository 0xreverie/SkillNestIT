import { axiosInstance } from "../lib/axios";
import { setCompanyProjects } from "../redux/actions/CompanyProjectsActions";

const getCompanyProjects = async (dispatch) => {
    const userId = sessionStorage.getItem("userId");
    const token = localStorage.getItem("token");
  
    try {
   
      const response = await axiosInstance.get(`/company-projects/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      dispatch(setCompanyProjects(response.data));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  export default getCompanyProjects;