import {useEffect} from 'react'

export default function setZIndex() {
  useEffect(() => {
    document.getElementById('zmmtg-root').style.zIndex = 1

    return () => {
      document.getElementById('zmmtg-root').style.zIndex = 1
    }
  })
}
