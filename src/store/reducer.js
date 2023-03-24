import { combineReducers } from "redux";
import { logInReducer } from "../pages/Jira-Admin/authPages/duck/reducer.";
import ListProjectreducer from "pages/Jira-Admin/projectManagement/duck/reducer";
export const rootReducer = combineReducers({ logInReducer, ListProjectreducer });
