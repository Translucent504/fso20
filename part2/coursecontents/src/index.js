import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, part)=>(
    acc + part.exercises
  ), 0)
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
        {course.parts.map((part)=> (
            <Part key={part.id} part={part}/>
        ))}      
    </div>
  )
}

const Course = ({course}) => (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </>
)


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
        <Course course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))