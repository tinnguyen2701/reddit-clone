import { fork, takeLatest, put, call } from 'redux-saga/effects';
import { createAction, callApi, createReducer } from '../dorothy/utils';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_RESPONSE = 'REGISTER_RESPONSE';
export const REGISTER_ERROR = 'REGISTER_ERROR';

function* requestRegister(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_BASE_URL}api/auth/register`,
      action.payload,
    );
    yield put(createAction(REGISTER_RESPONSE, response));
  } catch (error) {
    yield put(createAction(REGISTER_ERROR, error));
  }
}

function* watchRegisterRequest() {
  yield takeLatest(REGISTER_REQUEST, requestRegister);
}

const initRegister = null;
const registerActionHandler = {
  [REGISTER_RESPONSE]: (state, action) => {
    return action.payload.user;
  },
  [REGISTER_ERROR]: state => {
    // logError(action.payload)
    return state;
  },
};

export const registerReducer = createReducer(initRegister, registerActionHandler);
export const registerSaga = [fork(watchRegisterRequest)];
