import { combineReducers } from "redux";
import { logInReducer } from "../pages/Jira-Admin/authPages/duck/reducer.";
import ListProjectreducer from "pages/Jira-Admin/projectManagement/duck_ListProject/reducer";
import DELETEProjectreducer from "pages/Jira-Admin/projectManagement/duck_DeleteProject/reducer";
import ProjectDetailreducer from "pages/Jira-Admin/projectDetail/duck/reducer";
export const rootReducer = combineReducers({ logInReducer, ListProjectreducer, DELETEProjectreducer, ProjectDetailreducer });
