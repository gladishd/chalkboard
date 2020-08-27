import React, {useState, useEffect} from 'react'
import {ZoomMtg} from '@zoomus/websdk'
import history from '../../history'
require('../../../zoomSecrets')

let apiKeys = {
  apiKey: process.env.REACT_APP_ZOOM_API_KEY,
  apiSecret: process.env.REACT_APP_ZOOM_API_SECRET_KEY
}

let meetConfig = {
  apiKey: apiKeys.apiKey,
  meetingNumber: '2473055604',
  userName: '',
  userEmail: '', // must be the attendee email address
  passWord: '420420',
  leaveUrl: 'http://localhost:8080/studentClassDashBoard',
  role: 0
}

const Zoom = props => {
  const {user, courseId} = props

  //setting meeting config properties off of user
  meetConfig.userName = `${user.firstName} ${user.lastName}`
  meetConfig.userEmail = `${user.email}`
  if (user.accountType === 'teacher') {
    meetConfig.role = 1
    meetConfig.leaveUrl = `http://localhost:8080/TeacherClassboard/${courseId}`
  }

  function joinMeeting(signature, meetConfig) {
    ZoomMtg.init({
      leaveUrl: meetConfig.leaveUrl,
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
