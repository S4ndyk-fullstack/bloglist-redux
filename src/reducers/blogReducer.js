import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('blog state: ', state)
  switch (action.type) {
    case 'INITIALIZE':
      return action.data
    case 'CREATE':
      return state.concat(action.data)
    case 'LIKE':
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    case 'DELETE':
      return state.filter(blog => blog.id !== action.data.id)
    default: return state
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    const removedBlog = await blogService.remove(blog)
    dispatch({
      type: 'DELETE',
      data: removedBlog
    })
  }
}

export const like = blog => {
  return async dispatch => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    return dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const initialize = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: blogs
    })
  }
}

export default reducer