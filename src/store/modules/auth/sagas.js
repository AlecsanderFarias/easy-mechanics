import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';

import { signInSucess, signFailure, signOut, signUpSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/user/login', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    toast.success('Sesión iniciada correctamente');

    yield put(signInSucess(token, user));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error('Se produjo un error, inténtelo de nuevo más tarde.');
    }

    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const response = yield call(api.post, '/user', payload);

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    toast.success('Cuenta creada con éxito');

    yield put(signInSucess(token, user));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error('Se produjo un error, inténtelo de nuevo más tarde.');
    }

    yield put(signFailure());
  }
}

export function* setTokenRefresh({ payload }) {
  if (!payload) return;

  const { token, signed } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    if (signed) {
      yield put(signOut());
    }
  }
}

export function signOUt() {}

export function loginSuccess() {
  history.push('/company');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('persist/REHYDRATE', setTokenRefresh),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOUt),
  takeLatest('@auth/SIGN_IN_SUCCESS', loginSuccess),
]);
