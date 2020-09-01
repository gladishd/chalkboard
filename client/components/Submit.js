import React from 'react'
import React, { Component } from 'react'

export default class Submit extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default function Submit(props) {
    const assignment = props.assignment[0]
    console.log('lower ass ', assignment[0])
    return (
        <div>
            {/* <h1>Submit Component</h1> */}
            <h2>{assignment.assignmentName}</h2>
                <p>{assignment.description}</p>
                <form action="/api/submissions/" method="POST" enctype="multipart/form-data"> … 
                <p name='assignmentName'>{assignment.assignmentName}</p>
            {/* <label>Image</label>  */}
            <div>
                <input type="file" class="form-control" id="image" name="image"/>              
            </div>   
            <br/>                    
            <div class="form-group"> 
                <button type="submit" class="btn btn-primary" id="sendMessageButton">Send</button> 
            </div> 
            </form>

        </div>
    )
}

