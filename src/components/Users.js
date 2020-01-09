import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeUserbase } from '../reducers/userbaseReducer'

const Users = (props) => {
  useEffect(() => {
    console.log('running useffect')
    props.initializeUserbase()
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td>
            </td>
            <td>blogs created</td>
          </tr>
          {
            props.userbase
              .map(user =>
                <tr key={user.id}>
                  <Link to={`/users/${user.id}`}>
                    <td>{user.name}</td>
                  </Link>
                  <td>{user.blogs.length}</td>
                </tr>
                )
                }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userbase: state.userbase
  }
}

const mapDispatchToProps = {
  initializeUserbase
}

const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)

export default ConnectedUsers