export const setProjects = (projects) => ({
    type: "SET_PROJECTS",
    payload: { projects },
});

export const addProject = (project) => ({
    type: "ADD_PROJECT",
    payload: { project },
});

export const destroyProject = (id) => ({
    type: "DELETE_PROJECT",
    payload: { id },
});

export const updateProject = (project) => ({
    type: "UPDATE_PROJECT",
    payload: { project },
});