import { api } from "Utils/apiUtils";
import * as ActionType from "../type/type-editUser";

export const FetchEditUser = (user) => {
  return (dispatch) => {
    dispatch(actEditUserByIdRequest());

    api
      .put("api/Users/editUser", user)
      .then((res) => {
        dispatch(actEditUserByIdSuccess(res.data.content));
        window.alert(res.data.content);
      })
      .catch((error) => {
        dispatch(actEditUserByIdFail(error));
        window.alert(error);
      });
  };
};

const actEditUserByIdRequest = () => {
  return {
    type: ActionType.EDIT_USER_REQUEST,
  };
};

const actEditUserByIdSuccess = (data) => {
  return {
    type: ActionType.EDIT_USER_SUCCESS,
    payload: data,
  };
};

const actEditUserByIdFail = (error) => {
  return {
    type: ActionType.EDIT_USER_FAIL,
    payload: error,
  };
};
