const initialState = {
  message: null,
  type: 'success'
}

const reducer = (state = initialState, action) => {
  console.log('notificatio state now', state)
  switch (action.type) {
    case 'SUCCESS': return {
      message: action.data,
      type: 'success'
    }
    case 'ERROR': return {
      message: action.data,
      type: 'error'
    }
    default: return state
  }
}


export const createNotification = (notification, type = 'SUCCESS') => {
  return async dispatch => {
    setTimeout(() => {
      return dispatch({
        data: null,
        type: 'SUCCESS'
      })
    }, 10000)

    return dispatch({
      data: notification,
      type
    })
  }

}

export default reducer