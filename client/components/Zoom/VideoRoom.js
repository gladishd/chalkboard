import React from 'react'
import Zoom from './Zoom'
import setZIndex from './setZIndex'
import history from '../../history'

function VideoRoom() {
  setZIndex()

  return (
    <div>
      <Zoom />
    </div>
  )
}

export default VideoRoom
