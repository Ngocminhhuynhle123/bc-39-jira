import { logInRequert, logInSuccess, logInFaile } from "./types";
const initialState = {
    loading: false,
    data: null,
    error: null,
}
export const logInReducer = (state = initialState, action) => {
    switch (action.type) {
        case logInRequert:
            {
                state.loading = false;
                state.data = null;
                state.error = null;
                return { ...state }
            }
        case logInSuccess:
            {
                state.loading = true;
                state.data = action.payload;
                state.error = null;
                return { ...state }
            }

        case logInFaile:
            {
                state.loading = true;
                state.data = null;
                state.error = action.payload;
                return { ...state }
            }


        default: return { ...state }

    }
}
