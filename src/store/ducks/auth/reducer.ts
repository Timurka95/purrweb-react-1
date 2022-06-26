import { createReducer } from "typesafe-actions";
import { setName } from "./actionCreators";

export interface AuthReducer {
    name: string | null;
}

export default createReducer({} as AuthReducer)
    .handleAction(setName, (state, { payload }) => ({
        ...state,
        name: payload,
    }));
  