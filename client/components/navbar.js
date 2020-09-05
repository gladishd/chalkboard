import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, accountType}) => (
  <div id="navbar-component">
    <div className="navbar-header">
      <span className="singleLetter" value="C">
        C
      </span>
      <span className="singleLetter" value="h">
        h
      </span>
      <span className="singleLetter" value="a">
        a
      </span>
      <span className="singleLetter" value="l">
        l
      </span>
      <span className="singleLetter" value="k">
        k
      </span>
      <span className="singleLetter" value="b">
        b
      </span>
      <span className="singleLetter" value="o">
        o
      </span>
      <span className="singleLetter" value="a">
        a
      </span>
      <span className="singleLetter" value="r">
        r
      </span>
      <span className="singleLetter" value="d">
        d
      </span>
    </div>
    <nav>
      {isLoggedIn && accountType === 'admin' && (
        <div>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink'}}
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink'}}
            to="/studentDashboard"
          >
            Student Dashboard
          </NavLink>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink'}}
            to="/TeacherDash"
          >
            Teacher Dashboard
          </NavLink>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink'}}
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
            activeStyle={{color: 'hotpink'}}
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink'}}
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
            activeStyle={{color: 'hotpink'}}
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className="react-router-link"
            activeStyle={{color: 'hotpink'}}
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
