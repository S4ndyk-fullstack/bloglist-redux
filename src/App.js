import React, { useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Menubar from './components/Menubar'
import Container from '@material-ui/core/Container';
import './App.css'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
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
      <Container fixed>

        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input id='username' {...username} />
          </div>
          <div>
            salasana
            <input id='password' {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </Container>
    )
  }

  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <Container fixed>

      <Router>
        <Menubar />
        <h2>blogs</h2>
        <Notification />
        <Togglable buttonLabel='create new' ref={newBlogRef}>
          <NewBlog />
        </Togglable>

        <Route exact path='/users' render={() => <Users />} />
        <Route path='/' render={() => <Redirect to='/blogs' />} />
        <Route exact path='/blogs' render={() =>
          props.blogs.sort(byLikes).map(blog =>
            <div id='blog' key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </div>
          )
        } />

        <Route path='/blogs/:id' render={({ match }) => {
          const blog = props.blogs.find(b => b.id === match.params.id)
          return (
            <Blog blog={blog} creator={blog.user.username === props.user.username} />
          )
        }} />


        <Route path='/users/:id' render={({ match }) =>
          <User user={props.userbase.find(u => u.id === match.params.id)} />} />
      </Router>
    </Container>

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