const DEFAULT_STATE = {
    projects: [],
};

export const ProjectReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_PROJECTS":
            return { ...state, projects: action.payload.projects };
        case "ADD_PROJECT":
            return { ...state, projects: [...state.projects, action.payload.project] };
        case "DELETE_PROJECT":
            return { ...state, projects: state.projects.filter((project) => project.id !== action.payload.id) };

        case "UPDATE_PROJECT":
            return { ...state, projects: state.projects.map((project) => project.id === action.payload.project.id ? action.payload.project : project) };
        default:
            return state
    }
}