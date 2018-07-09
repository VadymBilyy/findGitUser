import { all } from 'redux-saga/effects'
import profile from 'containers/Profile/saga'

export default function* rootSaga() {
  yield all([
    profile()
  ])
}
