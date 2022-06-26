import { StateType, ActionType } from 'typesafe-actions';
import { rootReducer, rootActions } from './ducks';

declare module 'typesafe-actions' {
    export type RootState = StateType<typeof rootReducer>;
    export type RootAction = ActionType<typeof rootActions>;

    interface Types {
        RootAction: RootAction;
    }
}