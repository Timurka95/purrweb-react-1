import sagas from './sagas';
import { setName } from './actionCreators';
import reducer from './reducer';

export default {
    sagas,
    reducer,
    actions: {
        setName,
    }
};