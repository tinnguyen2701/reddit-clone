import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { registerReducer as register, registerSaga } from './components/duck';

const rootReducer = combineReducers({
  register,
});

export const rootSaga = function* rootSaga() {
  yield all([...registerSaga]);
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
