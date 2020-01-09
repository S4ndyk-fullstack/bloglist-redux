const initialState = {
  message: null,
  type: 'success'
}

const reducer = (state = initialState , action) => {
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


export const createNotification = (notification) => {
  if (notification.type === 'success') {
    return {
      data: notification.message,
      type: 'SUCCESS'
    }
  }
  return {
    data: notification.message,
    type: 'ERROR'
  }
}

export default reducer