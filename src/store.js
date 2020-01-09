import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import userbaceReducer from './reducers/userbaseReducer'

const reducers = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  userbase: userbaceReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store