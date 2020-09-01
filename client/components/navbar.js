import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, accountType}) => (
  <div id="navbar-component">
    <h1 className="navbar-header">Chalkboard</h1>
    <nav>
      {isLoggedIn && accountType === 'admin' && (
        <div>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink', textDecoration: 'none'}}
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink', textDecoration: 'none'}}
            to="/studentDashboard"
          >
            Student Dashboard
          </NavLink>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink', textDecoration: 'none'}}
            to="/TeacherDash"
          >
            Teacher Dashboard
          </NavLink>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink', textDecoration: 'none'}}
            to="/teacherDashboard"
          >
            Old Teacher Dashboard
          </NavLink>
          <NavLink
            to="/login"
            className="react-router-link"
            onClick={handleClick}
          >
            Logout
          </NavLink>
        </div>
      )}
      {isLoggedIn && accountType === 'teacher' && (
        <div>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink', textDecoration: 'none'}}
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink', textDecoration: 'none'}}
            to="/TeacherDash"
          >
            Teacher Dashboard
          </NavLink>
          <NavLink
            to="/login"
            className="react-router-link"
            onClick={handleClick}
          >
            Logout
          </NavLink>
        </div>
      )}
      {isLoggedIn && accountType === 'student' && (
        <div>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink', textDecoration: 'none'}}
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink', textDecoration: 'none'}}
            to="/studentDashboard"
          >
            Student Dashboard
          </NavLink>
          <NavLink
            to="/login"
            className="react-router-link"
            onClick={handleClick}
          >
            Logout
          </NavLink>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          {/* The navbar will show these links before you log in */}
          {/* <NavLink className="react-router-link" to="/login">
            Login
          </NavLink> */}
          {/* <NavLink className="react-router-link" to="/signup">
            Sign Up
          </NavLink> */}
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.me.id,
    accountType: state.user.me.accountType
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
