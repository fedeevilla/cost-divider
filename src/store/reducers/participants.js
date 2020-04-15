import { ADD_PARTICIPANT, DELETE_PARTICIPANT } from "../actions/participants";
import * as R from "ramda";

const initialState = {
  list: [],
};

const participants = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case ADD_PARTICIPANT:
      return {
        ...state,
        list: R.append(payload, state.list),
      };
    case DELETE_PARTICIPANT:
      return {
        ...state,
        list: state.list.filter((participant) => participant.name !== payload),
      };
    default:
      return state;
  }
};

export default participants;
