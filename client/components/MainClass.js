import React, { Component } from 'react'
import openSocket from 'socket.io-client';
import { newMessage, newChat } from '../Utils'

export default class MainClass extends Component {
    constructor(props){
        super(props)
            //this should be the
        }
        componentDidMount(){
            // const group = props.classId
        const socket = openSocket(`http://localhost:8080/`)
        // const socket = io()
        socket.on('message', (message) => {
            newMessage(message)
        })
        const chat = document.getElementById('chat')
        //pass id as the second arg for callback
        chat.addEventListener('keypress', (e) => {
            newChat(e)
        })
        }
        render() {
        
        
        // chat.addEventListener('keypress', newChat(e))
        return (
            <div id='main-class'>
                <div id='left'>

                </div>
                <div id='center'>
                    <div id='messages'>

                    </div>
                    <div id='chat'>
                        <input id='chat-input' type='text'/>
                    </div>
                </div>
                <div id='right'>

                </div>
            </div>
        )
        
    }
}
