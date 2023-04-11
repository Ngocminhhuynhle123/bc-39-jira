import {
  DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAIL
} from "./types";
import { api } from "Utils/apiUtils";

export const fetchDELETEProjectreducer = (id) => {
  return (dispatch) => {
    //request
    dispatch(actDelete_PROJECT_REQUEST());

    api
      .delete(`/api/Project/deleteProject?projectId=${id}`)
      .then((result) => {
        //success
        dispatch(actDelete_PROJECT_SUCCESS(result.data));
      })
      .catch((error) => {
        //fail
        console.log(error.response.data.content);
        dispatch(actDelete_PROJECT_FAIL(error));
      });
  };
};

export const actDelete_PROJECT_REQUEST = () => {
  return {
    type: DELETE_PROJECT_REQUEST,
  };
};

export const actDelete_PROJECT_SUCCESS = (data) => {
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload: data,
  };
};

export const actDelete_PROJECT_FAIL = (error) => {
  return {
    type: DELETE_PROJECT_FAIL,
    payload: error,
  };
};
