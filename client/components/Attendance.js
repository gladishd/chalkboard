import React, { Component } from 'react'
import openSocket from 'socket.io-client';
import {roster } from '../Utils'
export default class Attendance extends Component {
    constructor(props){
        super(props)
            //this should be the
    }
        componentDidMount(){
            // const group = props.classId
            const socket = openSocket(`http://localhost:8080/`)
            console.log('in mount')
            // const socket = io()
            socket.on('roster', (memory) => {
                console.log('hello memory ', memory)
                roster(memory)
            })
            const list = document.getElementById('attendance-list')
            const check = document.getElementById('test')
            const yes = document.querySelectorAll('.student')
            console.log('arr', Array.from(yes))
        }
    render() {
        return (
            <div>
                <h1>Attendance</h1>
                <h3>Students Online:</h3>
                <ul id='attendance-list'>

                </ul>
                <h3>Class Roster</h3>
                <form>
                    <input type='checkbox' className='student'/><p>Paul</p>
                    <input type='checkbox' className='student'/><p>John</p>
                    <input type='checkbox' className='student'/><p>Geroge</p>
                    <input type='checkbox'className='student'/><p>Ringo</p>
                    <button id='submit-attendance'>Submit</button>
                </form>
            </div>
        )
    }
}
