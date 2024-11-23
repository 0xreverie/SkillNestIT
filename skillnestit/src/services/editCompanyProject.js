import { axiosInstance } from "../lib/axios";
import { updateCompanyProject } from "../redux/actions/CompanyProjectsActions";

export const editCompanyProject = (id, editData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    await axiosInstance.put(
      `/projects/${id}`,
      editData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.reload();
    dispatch(updateCompanyProject());
  } catch (error) {
    console.log(error);
  }
};