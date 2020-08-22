import React from 'react'

export default function CourseListing(props) {
    const course = props.oneCourse
    return (
        <div>    
                <h3>{course.courseName}</h3>

        </div>
    )
}
