import loginService from '../services/login'
import blogService from '../services/blogs'
const initialState = null

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    let user = null
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
    return dispatch({
      type: 'INITIALIZE_USER',
      data: user
    })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': return action.data
    case 'INITIALIZE_USER': return action.data
    case 'LOGOUT': return initialState
    default: return state
  }
}

export const login = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    console.log('logging in', user)
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    return dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  blogService.destroyToken()
  window.localStorage.removeItem('loggedBlogAppUser')
  return {
    type: 'LOGOUT'
  }
}

export default reducer