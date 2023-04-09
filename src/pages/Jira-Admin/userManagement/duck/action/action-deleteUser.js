import { api } from "Utils/apiUtils";
import * as ActionType from "../type/type-deleteUser";

export const FetchDeleteUser = (userId) => {
  return (dispatch) => {
    dispatch(actDeleteUserRequest());

    api
      .delete(`api/Users/deleteUser?id=${userId}`)
      .then((res) => {
        dispatch(actDeleteUserSuccess(res.data.content));
        window.alert(res.data.content);
      })
      .catch((error) => {
        dispatch(actDeleteUserFail(error));
        window.alert(error);
      });
  };
};

const actDeleteUserRequest = () => {
  return {
    type: ActionType.DELETE_USER_REQUEST,
  };
};

const actDeleteUserSuccess = (data) => {
  return {
    type: ActionType.DELETE_USER_SUCCESS,
    payload: data,
  };
};

const actDeleteUserFail = (error) => {
  return {
    type: ActionType.DELETE_USER_FAIL,
    payload: error,
  };
};
