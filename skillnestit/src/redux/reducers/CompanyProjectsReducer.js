const DEFAULT_STATE = {
    companyProjects: [],
};

export const companyProjectReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_COMPANY_PROJECTS":
            return { ...state, companyProjects: action.payload.companyProjects };
        case "ADD_COMPANY_PROJECT":
            return { ...state, companyProjects: [...state.companyProjects, action.payload.companyProject] };
        case "DELETE_COMPANY_PROJECT":
            return { ...state, companyProjects: state.companyProjects.filter((companyProject) => companyProject.id !== action.payload.id) };

        case "UPDATE_COMPANY_PROJECT":
            return { ...state, companyProjects: state.companyProjects.map((companyProject) => companyProject.id === action.payload.companyProject.id ? action.payload.companyProject : companyProject) };
        default:
            return state
    }
}