import React, {useState, useEffect} from 'react'
import {ZoomMtg} from '@zoomus/websdk'
require('../../../zoomSecrets')

let apiKeys = {
  apiKey: process.env.REACT_APP_ZOOM_API_KEY,
  apiSecret: process.env.REACT_APP_ZOOM_API_SECRET_KEY
}

let meetConfig = {
  apiKey: apiKeys.apiKey,
  meetingNumber: '4102281543',
  userName: 'Example',
  userEmail: 'example@example.com', // must be the attendee email address
  passWord: '64k*Fi6_Of',
  leaveUrl: 'http://localhost:8080/',
  role: 0
}

function Zoom() {
  function joinMeeting(signature, meetConfig) {
    ZoomMtg.init({
      leaveUrl: 'http://localhost:8080/',
      isSupportAV: true,
      success: function(success) {
        console.log('Init Success ', success)
        ZoomMtg.join({
          meetingNumber: meetConfig.meetingNumber,
          userName: meetConfig.userName,
          signature: signature,
          apiKey: meetConfig.apiKey,
          passWord: meetConfig.passWord,

          success: success => {
            console.log(success)
          },

          error: error => {
            console.log(error)
          }
        })
      }
    })
  }
  useEffect(() => {
    ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.10/lib', '/av')
    ZoomMtg.preLoadWasm()
    ZoomMtg.prepareJssdk()

    //SEE DOCUMENTATION FOR SETTING SIGNATURE SERVER SIDE WITH SECRETS

    ZoomMtg.generateSignature({
      meetingNumber: meetConfig.meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: apiKeys.apiSecret,
      role: meetConfig.role,
      success: function(res) {
        console.log('res', res)

        setTimeout(() => {
          joinMeeting(res.result, meetConfig)
        }, 1000)
      }
    })
  }, [])

  return <></>
}

export default Zoom
