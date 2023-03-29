import {
  LIST_PROJECT_REQUEST,
  LIST_PROJECT_SUCCESS,
  LIST_PROJECT_FAIL,
} from "./types";
import { api } from "Utils/apiUtils";

export const fetchData_ListProjectreducer = () => {
  return (dispatch) => {
    //request
    dispatch(actLIST_PROJECT_REQUEST());

    api
      .get("/api/Project/getAllProject")
      .then((result) => {
        //success
        console.log(result.data.content);
        dispatch(actLIST_PROJECT_SUCCESS(result.data.content));
      })
      .catch((error) => {
        //fail
        dispatch(actLIST_PROJECT_FAIL(error));
      });
  };
};

export const actLIST_PROJECT_REQUEST = () => {
  return {
    type: LIST_PROJECT_REQUEST,
  };
};

export const actLIST_PROJECT_SUCCESS = (data) => {
  return {
    type: LIST_PROJECT_SUCCESS,
    payload: data,
  };
};

export const actLIST_PROJECT_FAIL = (error) => {
  return {
    type: LIST_PROJECT_FAIL,
    payload: error,
  };
};
