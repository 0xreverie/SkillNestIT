import { axiosInstance } from "../lib/axios";
import { updateUser } from "../redux/actions/UserActions";

export const editUser = (editData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    await axiosInstance.patch(
      '/users',
      editData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.reload();
    dispatch(updateUser());
  } catch (error) {
    console.log(error);
  }
};