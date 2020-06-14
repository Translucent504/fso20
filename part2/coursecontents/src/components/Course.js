import React from 'react'
import Header from './Header'
import Total from './Total'
import Content from './Content'


const Course = ({ course }) => (
    <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </>
)

export default Course
