import { api } from "Utils/apiUtils";
import * as ActionType from "../type/type-getUserById";

export const actFetchUserById = (userId) => {
  return (dispatch) => {
    dispatch(actGetUserByIdRequest());

    api
      .get(`api/Users/getUser?keyword=${userId}`)
      .then((res) => {
        dispatch(actGetUserByIdSuccess(res.data.content[0]));
      })
      .catch((error) => {
        dispatch(actGetUserByIdFail(error));
      });
  };
};

const actGetUserByIdRequest = () => {
  return {
    type: ActionType.GET_USER_REQUEST,
  };
};

const actGetUserByIdSuccess = (data) => {
  return {
    type: ActionType.GET_USER_SUCCESS,
    payload: data,
  };
};

const actGetUserByIdFail = (error) => {
  return {
    type: ActionType.GET_USER_FAIL,
    payload: error,
  };
};
