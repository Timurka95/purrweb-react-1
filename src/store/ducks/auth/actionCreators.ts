import { createAction } from "typesafe-actions";
import { setNameActionType } from "./actionTypes";

export const setName = createAction(
    setNameActionType,
    (payload: string) => payload,
)();