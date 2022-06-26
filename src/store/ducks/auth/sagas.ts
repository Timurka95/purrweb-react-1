import { takeEvery, put } from "redux-saga/effects";
import { setName } from "./actionCreators";

function* handleSetName({ payload }: ReturnType<typeof setName>) {
    try {
        yield put(setName(payload))
    } catch (error) {
        console.error('[SET NAME]:', error);
    }
}

export default [
    takeEvery(setName, handleSetName)
];
