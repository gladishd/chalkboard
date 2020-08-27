import React from 'react'
import Zoom from './Zoom'
import setZIndex from './setZIndex'

function VideoRoom() {
  setZIndex()
  return (
    <div>
      <Zoom />
    </div>
  )
}

export default VideoRoom
