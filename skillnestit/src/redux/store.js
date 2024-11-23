import { ProjectReducer } from "./reducers/ProjectReducer";
import { DetailProjectReducer } from "./reducers/DetailProjectReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { companyProjectReducer } from "./reducers/CompanyProjectsReducer";
import { UserReducer } from "./reducers/UserReducer";

const rootReducer = combineReducers({
    user: UserReducer,
    project: ProjectReducer,
    companyProject: companyProjectReducer,
    detailProject: DetailProjectReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;