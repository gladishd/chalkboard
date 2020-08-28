import React from 'react'
import Zoom from './Zoom'
import setZIndex from './setZIndex'
import {connect} from 'react-redux'

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
}

const mapState = state => {
  return {
    user: state.user.me,
    courseId: state.course.single.id
  }
}

export default connect(mapState)(VideoRoom)
