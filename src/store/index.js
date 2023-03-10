import { createStore,compose,applyMiddleware } from "redux";
import { rootReducer } from "./reducer";
import thunk from "redux-thunk"
const comoseEnhencers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
const store = createStore(
  rootReducer,
  comoseEnhencers(applyMiddleware(thunk))
);

export default store;
