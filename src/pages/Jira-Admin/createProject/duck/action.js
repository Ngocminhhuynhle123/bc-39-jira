import {
  CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAIL
} from "./types";
import { api } from "Utils/apiUtils";

export const fetchCREATEProjectreducer = (project, navigate) => {
  return (dispatch) => {
    //request
    dispatch(actCREATE_PROJECT_REQUEST());

    api
      .post(`/api/Project/createProject`, project)
      .then((result) => {
        //success
        dispatch(actCREATE_PROJECT_SUCCESS(result.data));
        navigate("/", { replace: true });

      })
      .catch((error) => {
        //fail
        console.log(error.response.data.content);
        dispatch(actCREATE_PROJECT_FAIL(error));
      });
  };
};

export const actCREATE_PROJECT_REQUEST = () => {
  return {
    type: CREATE_PROJECT_REQUEST,
  };
};

export const actCREATE_PROJECT_SUCCESS = (data) => {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: data,
  };
};

export const actCREATE_PROJECT_FAIL = (error) => {
  return {
    type: CREATE_PROJECT_FAIL,
    payload: error,
  };
};
