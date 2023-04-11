import {
  LIST_PROJECT_REQUEST,
  LIST_PROJECT_SUCCESS,
  LIST_PROJECT_FAIL,
} from "./types";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const ListProjectreducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_PROJECT_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case LIST_PROJECT_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case LIST_PROJECT_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default ListProjectreducer;
