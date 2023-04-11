import {
  DELETE_PROJECT_REQUEST,DELETE_PROJECT_SUCCESS,DELETE_PROJECT_FAIL
} from "./types";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const DELETEProjectreducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case DELETE_PROJECT_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case DELETE_PROJECT_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default DELETEProjectreducer;
