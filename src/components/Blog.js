import React from 'react'
import { connect } from 'react-redux'
import { like, removeBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Blog = (props) => {
  const blog = props.blog
  const creator = props.creator

  if(!props.blog) {
    return null
  }

  const like = async (blog) => {
    props.like(blog)
    props.createNotification(`blog ${blog.title} by ${blog.author} liked!`)
  }

  const remove = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.removeBlog(blog)
      props.createNotification(`blog ${blog.title} by ${blog.author} removed!`)
      props.history.push('/blogs')
    }
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <Button variant='contained' color='primary' onClick={() => like(blog)}>like</Button>
      </div>
      <div>added by {blog.user.name}</div>
      {creator && (<button onClick={() => remove(blog)}>remove </button>)}
    </div>
  )
}


const mapDispatchToProps = {
  like,
  removeBlog,
  createNotification
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  creator: PropTypes.bool.isRequired
}

const ConnectedBlog = connect(null, mapDispatchToProps)(Blog)

export default withRouter(ConnectedBlog)