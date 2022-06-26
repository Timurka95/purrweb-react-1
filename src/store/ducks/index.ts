import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import authDuck from './auth';

export const rootReducer = combineReducers({
    auth: authDuck.reducer,
    // column: columnDuck.reducer,
    // card: cardDuck.reducer,
});

export const rootActions = {
    auth: authDuck.actions,
    // column: columnDuck.actions,
    // card: cardDuck.actions,
};

export const $action = {
    // auth: $authActions,
    // column: $columnActions,
    // card: $cardActions,
};

export function* rootSagas() {
    yield all([
        ...authDuck.sagas,
        // ...columnDuck.sagas,
        // ...cardDuck.sagas,
    ])
}
