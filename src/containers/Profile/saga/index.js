import { delay } from 'redux-saga'
import { all } from 'redux-saga/effects'

export function* helloSaga() {
  yield delay(100)
  console.log('Hello Profile Sagas!') // eslint-disable-line
}

export default function* rootSaga() {
  yield all([
    helloSaga()
  ])
}
