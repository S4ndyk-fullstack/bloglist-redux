import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { connect } from 'react-redux'


const Menubar = (props) => {
  return (
    <ul className='menu'>
      <li className='menuItem'>
        <Link className='link' to='/blogs'>blogs</Link>
      </li>
      <li className='menuItem'>
        <Link className='link' to='/users'>users</Link>
      </li>
      <li className='menuItem'>
        <button className='link' onClick={() => props.logout()}>logout</button>
      </li>
      <li>
        <p>{props.user.name} logged in</p>
      </li>
    </ul>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logout
}

const ConnectedMenubar = connect(mapStateToProps, mapDispatchToProps)(Menubar)

export default ConnectedMenubar