import {
  PROJECT_DETAIL_REQUEST, PROJECT_DETAIL_SUCCESS, PROJECT_DETAIL_FAIL
} from "./types";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const ProjectDetailreducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_DETAIL_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case PROJECT_DETAIL_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case PROJECT_DETAIL_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default ProjectDetailreducer;
