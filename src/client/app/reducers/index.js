import { combineReducers } from 'redux'
import feedback from './feedback.js'
import search from './search.js'
import support from './support.js'
import home from './home.js'
import subscribe from './subscribe.js'
import bulkdelete from './bulkdelete.js'

export default combineReducers({
  feedback,
  search,
  support,
  home,
  subscribe,
  bulkdelete
})