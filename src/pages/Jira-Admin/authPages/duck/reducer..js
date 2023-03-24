import { logInRequert, logInSuccess, logInFaile } from "./types";
const initialState = {
    loading: false,
    data: null,
    error: null,
    logIn:null
}
export const logInReducer = (state = initialState, action) => {
    switch (action.type) {
        case logInRequert:
            {
                state.loading = true;
                state.data = null;
                state.error = null;
                state.logIn = null;
                return { ...state }
            }
        case logInSuccess:
            {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
                state.logIn = null;
                return { ...state }
            }

        case logInFaile:
            {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
                state.logIn = null;
                return { ...state }
            }
        default: return { ...state }

    }
}
