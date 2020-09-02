import {useEffect} from 'react'

export default function setZIndex() {
  useEffect(() => {
    let zoomMeetingRoot = document.getElementById('zmmtg-root')
    zoomMeetingRoot.style.zIndex = 1
    zoomMeetingRoot.style.backgroundImage = 'none'
    zoomMeetingRoot.style.backgroundColor = 'black'
    return () => {
      zoomMeetingRoot.style.zIndex = -1
      zoomMeetingRoot.style.backgroundColor = 'none'
      zoomMeetingRoot.style.backgroundImage = url('chalkboard-bg.png')
    }
  }, [])
}
