import React, { useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useField } from './hooks'
import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout, login } from './reducers/userReducer'
import { connect } from 'react-redux'

const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  useEffect(() => {
    props.initializeUser()
    props.initializeBlogs()
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.login({
        username: username.value,
        password: password.value
      })
    } catch (exception) {
      props.createNotification('wrong username of password', 'ERROR')
    }
  }

  if (props.user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username} />
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

      <p>{props.user.name} logged in</p>
      <button onClick={() => props.logout()}>logout</button>

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog />
      </Togglable>


      <Router>
        <Route exact path='/users' render={() => <Users />} />
        <Route exact path='/' render={() =>
          props.blogs.sort(byLikes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              creator={blog.user.username === props.user.username}
            />
          )
        } />
        <Route path='/users/:id' render={({ match }) => 
          <User user={props.userbase.find(u => u.id === match.params.id)}/>} />
      </Router>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    userbase: state.userbase
  }
}

const mapDispatchToProps = {
  createNotification,
  initializeBlogs,
  initializeUser,
  login,
  logout
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp