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

//attendance
export function roster (students){
    const list = document.getElementById('attendance-list')
    for(let key in students){
        console.log('key ', key)
        let student = document.createElement('li')
        student.innerHTML = students[key]
        list.appendChild(student)

    }

}

