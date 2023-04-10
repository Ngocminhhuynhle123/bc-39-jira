import { api } from "Utils/apiUtils";
import * as ActionType from "../type/type-createUser";

export const FetchAddUser = (user) => {
  return (dispatch) => {
    dispatch(actAddUserRequest());
    api
      .post(`api/Users/signup`, user)
      .then((res) => {
        dispatch(actAddUserSuccess(res.data.content));
        window.alert(res.data.content);
      })
      .catch((error) => {
        dispatch(actAddUserFail(error));
        window.alert(error);
      });
  };
};

const actAddUserRequest = () => {
  return {
    type: ActionType.ADD_USER_REQUEST,
  };
};

const actAddUserSuccess = (data) => {
  return {
    type: ActionType.ADD_USER_SUCCESS,
    payload: data,
  };
};

const actAddUserFail = (error) => {
  return {
    type: ActionType.ADD_USER_FAIL,
    payload: error,
  };
};
