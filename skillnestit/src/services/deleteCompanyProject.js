import { axiosInstance } from "../lib/axios"
import { destroycompanyProject } from "../redux/actions/CompanyProjectsActions"

export const deleteCompanyProject = (id) => async (dispatch) => {
    const token = localStorage.getItem('token')
    try {
        await axiosInstance.delete(`/projects/${id}`, {headers: {
            Authorization: `Bearer ${token}`
        }})
        dispatch(destroycompanyProject(id))
    } catch(error){
        console.log(error.message)
    }
}