import { all, fork } from 'redux-saga/effects'

import quizSaga from './quizSaga'

export default function* rootSaga() {
  yield all([fork(quizSaga)])
}
