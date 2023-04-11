import { combineReducers } from "redux";

import { logInReducer } from "../pages/Jira-Admin/authPages/duck/reducer.";
import ListProjectreducer from "pages/Jira-Admin/projectManagement/duck/reducer";
import { listUserReducer } from "../pages/Jira-Admin/userManagement/duck/reducer/reducer-listUser";
import { AddUserReducer } from "pages/Jira-Admin/userManagement/duck/reducer/reducer-createUser";
import { deleteUserReducer } from "pages/Jira-Admin/userManagement/duck/reducer/reducer-deleteUser";
import { editUserReducer } from "pages/Jira-Admin/userManagement/duck/reducer/reducer-editUser";
import { getUserByIdReducer } from "pages/Jira-Admin/userManagement/duck/reducer/reducer-getUserById";
import ProjectDetailreducer from "pages/Jira-Admin/projectDetail/duck/reducer";
import CREATEProjectreducer from "pages/Jira-Admin/createProject/duck/reducer";
export const rootReducer = combineReducers({
  ListProjectreducer,
  logInReducer,
  listUserReducer,
  deleteUserReducer,
  AddUserReducer,
  editUserReducer,
  getUserByIdReducer,
  ProjectDetailreducer,
  CREATEProjectreducer
});
