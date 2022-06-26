import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, Persistor } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer, rootSagas } from './ducks';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

const persistor = persistStore(store);
sagaMiddleware.run(rootSagas);

export { store, persistor };