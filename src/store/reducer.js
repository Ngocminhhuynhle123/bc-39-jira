import { combineReducers } from "redux";
import { logInReducer } from "../pages/Jira-Admin/authPages/duck/reducer.";
import { listUserReducer } from "pages/Jira-Admin/userManagement/duck/reducer/reducer-listUser";
import { editUserReducer } from "pages/Jira-Admin/userManagement/duck/reducer/reducer-editUser";
import { AddUserReducer } from "pages/Jira-Admin/userManagement/duck/reducer/reducer-createUser";
import { deleteUserReducer } from "pages/Jira-Admin/userManagement/duck/reducer/reducer-deleteUser";

export const rootReducer = combineReducers({
  logInReducer,
  listUserReducer,
  editUserReducer,
  AddUserReducer,
  deleteUserReducer,
});
