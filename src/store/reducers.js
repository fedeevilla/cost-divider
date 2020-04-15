import { combineReducers } from "redux";
import participants from "./reducers/participants";

const rootReducer = combineReducers({
  participants,
});

export default rootReducer;
