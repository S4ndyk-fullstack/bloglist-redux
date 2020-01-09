import React from 'react'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const NewBlog = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    props.createNotification(`a new blog ${title.value} by ${author.value} added`)
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  createNotification
}

const ConnectedNewBlog = connect(null, mapDispatchToProps)(NewBlog)

export default ConnectedNewBlog