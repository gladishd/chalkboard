import { createStoreHook } from "react-redux"
import { createElement } from "react"
import openSocket from 'socket.io-client';

export function newMessage(message){
    const item = document.createElement('p')
    item.classList.add('message')
    const list = document.getElementById('messages')
    item.innerHTML = message
    list.appendChild(item)
}

export function newChat (e){
        //param for socket is second arg, namespace
        const socket = openSocket(`http://localhost:8080/`)
        if (e.key === 'Enter') {
          socket.emit('message', e.target.value)
          e.target.value = ''
        }

}


