import React from 'react'

const User = (props) => {
  const user = props.user
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User
