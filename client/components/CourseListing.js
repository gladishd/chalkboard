import React from 'react'

export default function CourseListing(props) {
  const course = props.oneCourse
  return (
    <div>
      <h4>{course.courseName}</h4>
      <p>Number of Students: {course.size}</p>
    </div>
  )
}
