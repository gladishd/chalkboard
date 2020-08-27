import React from 'react'
import Zoom from './Zoom'
import setZIndex from './setZIndex'
import history from '../../history'
import {connect} from 'react-redux'
import user from '../../store/user'

function VideoRoom(props) {
  setZIndex()

  const {user, courseId} = props

  if (user.id) {
    return (
      <div>
        <Zoom user={user} courseId={courseId} />
      </div>
    )
  } else {
    return <>Loading</>
  }

  // return (
  //   <div>
  //     <Zoom />
  //   </div>
  // )
}

const mapState = state => {
  return {
    user: state.user.me,
    courseId: state.course.single.id
  }
}

export default connect(mapState)(VideoRoom)
