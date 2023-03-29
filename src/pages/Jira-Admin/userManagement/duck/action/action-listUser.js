import { api } from "Utils/apiUtils";
import * as ActionType from "../type/type-listUser";

export const actFetchDataListUser = () => {
  return (dispatch) => {
    dispatch(actListUserRequest());

    api
      .get("api/Users/getUser")
      .then((res) => {
        dispatch(actListUserSuccess(res.data.content));
      })
      .catch((error) => {
        dispatch(actListUserFail(error));
      });
  };
};

const actListUserRequest = () => {
  return {
    type: ActionType.LIST_USER_REQUEST,
  };
};

const actListUserSuccess = (data) => {
  return {
    type: ActionType.LIST_USER_SUCCESS,
    payload: data,
  };
};

const actListUserFail = (error) => {
  return {
    type: ActionType.LIST_USER_FAIL,
    payload: error,
  };
};
