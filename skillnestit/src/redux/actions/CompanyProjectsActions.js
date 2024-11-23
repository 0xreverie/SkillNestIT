export const setCompanyProjects = (companyProjects) => ({
    type: "SET_COMPANY_PROJECTS",
    payload: { companyProjects },
});

export const addCompanyProject = (companyProject) => ({
    type: "ADD_COMPANY_PROJECT",
    payload: { companyProject },
});

export const destroycompanyProject = (id) => ({
    type: "DELETE_COMPANY_PROJECT",
    payload: { id },
});

export const updateCompanyProject = (companyProject) => ({
    type: "UPDATE_COMPANY_PROJECT",
    payload: { companyProject },
});