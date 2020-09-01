
// import React, { Component } from 'react'

import React, { Component } from 'react'
import axios from 'axios'
export default class Submit extends Component {
    constructor(props){
        super(props)
        this.state = {
            file: null
        }
        // const assignment = props.assignment[0]
        // this.assignmentName = assignment.assignmentName

        // this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.fileUpload = this.fileUpload.bind(this)
    
    }

//   onFormSubmit(e){
//     e.preventDefault() // Stop form submit
//     this.fileUpload(this.state.file)

//     const data = {
//         studentId: 
//     }
//     const config = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     }
//     // .then((response)=>{
//     //   console.log(response.data);
//     // })
//     axios.post('/api/submissions/',)
//   }

  onChange(e) {
      console.log('in onchange')
    this.setState({
        file: e.target.files[0]
    })
    console.log('pic ', this.state.file)
  }

//   fileUpload(file){
//     // const url = 'http://example.com/file-upload';
//     console.log('file first ', file)
//     const formData = new FormData();
//     formData.append('file',file)
//     // const config = {
//     //     headers: {
//     //         'content-type': 'multipart/form-data'
//     //     }
//     // }
//     console.log('form data ', formData)
//     // return  post(url, formData,config)
//   }
    async handleSubmit(e){
        e.preventDefault()
        console.log('this far on the page')
        
            const method = 'post'
            const url = '/api/submissions/'
            const data = {
                // file: this.state.file,
                studentId: this.props.userId,
                courseId: this.props.courseId,
                studentId: this.props.id,
              firstName: this.props.firstName,
              assignmentName: this.props.assignmentName,
              assignmentType: this.props.assignmentType
            }
            const config = {
                headers: {
                    // 'content-type': 'multipart/form-data',
                    'content-type': "application/json" 
                    
                }
            }
        try{

            await axios.post('/api/submissions/', data, config)
        }catch(err){
            console.log(err)
        }
      
    }
    render() {
        const studentId = this.props.userId
        
        const assignment = this.props.assignment[0]
        console.log('props assignments name ', this.props.assignment[0])
        return (
            <div>
                {/* <h1>Submit Component</h1> */}
                <h2>{assignment.assignmentName}</h2>
                    <p>{assignment.description}</p>
                <form onSubmit={this.handleSubmit}> 
                    {/* <form onSubmit={logBody}>  */}
                        <p name='assignmentName'>{assignment.assignmentName}</p>
                    {/* <label>Image</label>  */}
                    <div>
                        <input type="file" className="form-control" id="image" name="image" onChange={this.onChange}/>              
                    </div>   
                    <br/>                    
                    <div className="form-group"> 
                        <button type="submit" id="sendMessageButton">Send</button> 
                    </div> 
                </form>
            </div>
        )
    }
}



// const logBody = (e) => {
//     e.preventDefault()
//     console.log('body ', e)
// }
// export default function Submit(props) {
//     const assignment = props.assignment[0]
//     console.log('lower assignment ', assignment[0])
//     return (
//         <div>
            

//         </div>
//     )
// }

