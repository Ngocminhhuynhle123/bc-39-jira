import { logInRequert, logInSuccess, logInFaile, logIn, logOut } from "./types";
import { api } from "Utils/apiUtils";
const actlogInRequert = () => ({ type: logInRequert });
const actlogInSuccess = (data) => {
  return {
    type: logInSuccess,
    payload: data,
  };
};
const actlogInFaile = (error) => {
    return {
        type: logInFaile,
        payload: error
    }
}
export const fetDataLogInReducer = (user, navigate) => {
    return (dispatch) => {
        dispatch(actlogInRequert())
        api.post('api/Users/signin', user)
            .then((retult) => {
                dispatch(actlogInSuccess(retult.data.content))
                localStorage.setItem('@user', JSON.stringify(retult.data.content))
                navigate("/", { replace: true });
            })
            .catch((error) => {
                dispatch(actlogInFaile(error))
            })
    }
}
