import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import profile from 'containers/Profile/reducer'

const reducers = combineReducers({
  profile,
  router: routerReducer
})

export default reducers
