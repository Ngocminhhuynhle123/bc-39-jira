import {
  PROJECT_DETAIL_REQUEST, PROJECT_DETAIL_SUCCESS, PROJECT_DETAIL_FAIL
} from "./types";
import { api } from "Utils/apiUtils";

export const FetchProjectDetailreducer = (id) => {
  return (dispatch) => {
    //request
    dispatch(actPROJECT_DETAIL_REQUEST());

    api
      .get(`/api/Project/getProjectDetail?id=${id}`)
      .then((result) => {
        //success
        dispatch(actPROJECT_DETAIL_SUCCESS(result.data.content));
      })
      .catch((error) => {
        //fail
        dispatch(actPROJECT_DETAIL_FAIL(error));
      });
  };
};

export const actPROJECT_DETAIL_REQUEST = () => {
  return {
    type: PROJECT_DETAIL_REQUEST,
  };
};

export const actPROJECT_DETAIL_SUCCESS = (data) => {
  return {
    type: PROJECT_DETAIL_SUCCESS,
    payload: data,
  };
};

export const actPROJECT_DETAIL_FAIL = (error) => {
  return {
    type: PROJECT_DETAIL_FAIL,
    payload: error,
  };
};
