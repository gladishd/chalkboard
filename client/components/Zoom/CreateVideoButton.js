import React from 'react'
import history from '../../history'

function CreateVideoButton() {
  const handleClick = () => {
    history.push('/video/id')
  }
  return (
    <button type="button" onClick={handleClick}>
      Create Room
    </button>
  )
}

export default CreateVideoButton
