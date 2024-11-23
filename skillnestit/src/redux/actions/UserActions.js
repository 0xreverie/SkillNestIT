export const setUser = (user) => ({
    type: "SET_USER",
    payload: { user },
});

export const addUser = (user) => ({
    type: "ADD_USER",
    payload: { user },
})

export const destroyUser = (id) => ({
    type: "DELETE_USER",
    payload: { id },
});

export const updateUser = (user) => ({
    type: "UPDATE_USER",
    payload: { user }
})