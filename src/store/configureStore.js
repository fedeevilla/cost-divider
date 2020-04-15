import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

export default function configureStore() {
  // Redux devtool
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // Store
  const store = {
    ...createStore(rootReducer, composeEnhancers(applyMiddleware(thunk))),
  };
  // Return store
  return store;
}
