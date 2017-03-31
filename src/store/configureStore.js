import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './../reducers';
// import syncOffline from './../syncOffline/syncOffline';
// import { syncFirebase } from './../firebase/firebase';

function configureStore(initialState) {
    const store = createStore(
        reducer,
        applyMiddleware(thunk)
    )
    // syncOffline(store)
    // syncFirebase(store)

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
}

const store = configureStore({});

export default store;