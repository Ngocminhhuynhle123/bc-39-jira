import { combineReducers } from "redux";
import { logInReducer } from "../pages/Jira-Admin/authPages/duck/reducer.";
export const rootReducer = combineReducers({ logInReducer });
