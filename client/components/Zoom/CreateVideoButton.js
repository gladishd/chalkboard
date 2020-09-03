import React from 'react'
import history from '../../history'

function CreateVideoButton() {
  const handleClick = () => {
    history.push('/video/zoom')
  }
  return (
    <button
      type="button"
      className="classboardStartLecture"
      onClick={handleClick}
    >
      Open Zoom Room
    </button>
  )
}

export default CreateVideoButton
