const DEFAULT_STATE = {
  user: {},
};

export const UserReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload.user };
    case "ADD_USER":
      return { ...state, user: [...state.user, action.payload.user] };
    case "DELETE_USER":
      return {
        ...state,
        users: state.user.filter((user) => user.id !== action.payload.id),
      };

    case "UPDATE_USER":
        return {
            ...state,
            user: { ...state.user, ...action.payload },
          };
    default:
      return state;
  }
};
