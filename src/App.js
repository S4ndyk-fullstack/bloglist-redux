import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { createNotification } from './reducers/notificationReducer'
import { createBlog, initialize, removeBlog, like } from './reducers/blogReducer'
import { connect } from 'react-redux'

const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    props.initialize()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'success') => {
    props.createNotification({ message, type })
    setTimeout(() => props.createNotification({ message: null }), 10000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      notify('wrong username of password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async (blog) => {
    newBlogRef.current.toggleVisibility()
    const createdBlog = props.createBlog(blog)
    console.log(createdBlog)
    notify(`a new blog ${blog.title} by ${blog.author} added`)
  }

  const likeBlog = async (blog) => {
    props.like(blog)
    notify(`blog ${blog.title} by ${blog.author} liked!`)
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.removeBlog(blog)
      notify(`blog ${blog.title} by ${blog.author} removed!`)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username}/>
          </div>
          <div>
            salasana
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {props.blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={likeBlog}
          remove={removeBlog}
          user={user}
          creator={blog.user.username === user.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  createNotification,
  createBlog,
  removeBlog,
  initialize,
  like
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp