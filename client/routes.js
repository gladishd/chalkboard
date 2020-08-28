import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  StudentDashboard,
  studentClassDashboard,
  moreClassInformationComponent,
  TeacherDashboard,
  TeacherClassboard,
  TeacherDash,
  VideoRoom,
  CreateVideo,
  AssignmentForm
} from './components'
import {me} from './store'
import MainClass from './components/MainClass'
import Attendance from './components/Attendance'
import {setSocket} from './store/socket'
import io from 'socket.io-client'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    const socket = io()
    this.props.loadInitialData()
    this.props.newSocket(socket)
  }

  render() {
    const {isLoggedIn, accountType} = this.props

    return (
      <Switch id="routes-component">
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route exact path="/video" component={CreateVideo} />

        <Route path="/assignment/:courseId" component={AssignmentForm} />
        {/* <Route path="/video/zoom" component={VideoRoom} /> */}

        {/* Routes below give conditional access based on account type */}

        {/* Admin Routes */}
        {isLoggedIn && accountType === 'admin' && (
          <Switch>
            <Route path="/home" component={UserHome} />
            {/* The route below will need to be changed to an add user form component available to admin */}
            {/* <Route path="/signup" component={Signup} /> */}
          </Switch>
        )}

        {/* Teacher Routes */}
        {isLoggedIn && accountType === 'teacher' && (
          <Switch>
            <Route path="/home" component={UserHome} />
            <Route path="/main" component={MainClass} />
            <Route path="/attendance" component={Attendance} />
            <Route
              path="/moreClassInformationComponent"
              component={moreClassInformationComponent}
            />
            <Route path="/TeacherClassboard" component={TeacherClassboard} />

            <Route path="/teacherDashboard" component={TeacherDashboard} />
            <Route path="/TeacherDash" component={TeacherDash} />
            <Route
              path="/studentClassDashboard"
              component={studentClassDashboard}
            />
            <Route exact path="/video" component={CreateVideo} />
            <Route path="/video/zoom" component={VideoRoom} />
          </Switch>
        )}
        {/* Student Routes */}
        {isLoggedIn && accountType === 'student' && (
          <Switch>
            <Route path="/home" component={UserHome} />

            <Route path="/main" component={MainClass} />
            <Route path="/studentDashboard" component={StudentDashboard} />
            <Route
              path="/studentClassDashboard"
              component={studentClassDashboard}
            />
            <Route exact path="/video" component={CreateVideo} />
            <Route path="/video/zoom" component={VideoRoom} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.me.id,
    accountType: state.user.me.accountType
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    newSocket: socket => dispatch(setSocket(socket))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
