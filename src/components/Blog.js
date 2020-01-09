import React, { useState } from 'react'
import { connect } from 'react-redux'
import { like, removeBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const blog = props.blog
  const creator = props.creator
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = async (blog) => {
    props.like(blog)
    props.createNotification(`blog ${blog.title} by ${blog.author} liked!`)
  }

  const remove= async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.removeBlog(blog)
      props.createNotification(`blog ${blog.title} by ${blog.author} removed!`)
    }
  }

  const details = () => (
    <div className='details'>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {creator &&(<button onClick={() => remove(blog)}>remove </button>)}
    </div>
  )

  return (
    <div style={blogStyle}>
      <div onClick={() => setExpanded(!expanded)} className='name'>
        {blog.title} {blog.author}
      </div>
      {expanded && details()}
    </div>
  )}


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

export default ConnectedBlog