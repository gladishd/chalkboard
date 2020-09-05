import React from 'react'
import history from '../../history'

function JoinVideoButton() {
  const handleClick = () => {
    history.push('/video/zoom')
  }
  return (
    <button
      type="button"
      className="classboardStartLecture"
      onClick={handleClick}
    >
      Join Zoom Room
    </button>
  )
}

export default JoinVideoButton
