import { combineReducers } from "redux";

import { logInReducer } from "../pages/Jira-Admin/authPages/duck/reducer.";
import ListProjectreducer from "pages/Jira-Admin/projectManagement/duck/reducer";
import { listUserReducer } from "../pages/Jira-Admin/userManagement/duck/reducer/reducer-listUser";
import { AddUserReducer } from "pages/Jira-Admin/userManagement/duck/reducer/reducer-createUser";
import { deleteUserReducer } from "pages/Jira-Admin/userManagement/duck/reducer/reducer-deleteUser";
import { editUserReducer } from "pages/Jira-Admin/userManagement/duck/reducer/reducer-editUser";

export const rootReducer = combineReducers({
  ListProjectreducer,
  logInReducer,
  listUserReducer,
  deleteUserReducer,
  AddUserReducer,
  editUserReducer,
});
