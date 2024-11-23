const DEFAULT_STATE = {
    detailProjects: [],
};

export const DetailProjectReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_DETAIL_PROJECTS":
            return { ...state, detailProjects: action.payload.detailProjects };
        case "ADD_DETAIL_PROJECT":
            return { ...state, detailProjects: [...state.detailProjects, action.payload.detailProject] };
        case "DELETE_DETAIL_PROJECT":
            return { ...state, detailProjects: state.detailProjects.filter((detailProject) => detailProject.id !== action.payload.id) };

        case "UPDATE_DETAIL_PROJECT":
            return { ...state, detailProjects: state.detailProjects.map((detailProject) => detailProject.id === action.payload.detailProject.id ? action.payload.detailProject : detailProject) };
        default:
            return state
    }
}