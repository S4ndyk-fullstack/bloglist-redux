import userService from '../services/users'

const reducer = (state = [], action) => {
  console.log('userbase state', state)
  switch(action.type) {
    case 'INITIALIZE_USERBASE': return action.data
    default: return state
  }
}

export const initializeUserbase = () => {
  return async dispatch => {
    const userbase = await userService.getAll() 
    return dispatch({
      type: 'INITIALIZE_USERBASE',
      data: userbase
    })
  }
}

export default reducer