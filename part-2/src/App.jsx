
const Header = ({course}) => {
  console.log('Header: ', course);
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({name, exercises}) => {
  console.log('Part: ', name, exercises)
  return (
    <p>
      {name}: {exercises}
    </p>
  )
}

const Content = ({ course }) => {
  console.log('Content: ', course);
  return (
    <>
      {course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </>
  );
}

const Total = ({course}) => {
  console.log('Total: ', course);
  const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <p>
      <strong>Number of exercises {total}</strong>
    </p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App