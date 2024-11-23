export const setDetailProjects = (detailProjects) => ({
    type: "SET_DETAIL_PROJECTS",
    payload: { detailProjects },
});

export const addDetailProject = (detailProject) => ({
    type: "ADD_DETAIL_PROJECT",
    payload: { detailProject },
});

export const destroyDetailProject = (id) => ({
    type: "DELETE_DETAIL_PROJECT",
    payload: { id },
});

export const updateDetailProject = (detailProject) => ({
    type: "UPDATE_DETAIL_PROJECT",
    payload: { detailProject },
});