const App = () => {
    const course = 'Half Stack application development';

    const parts = [
        {
          name: 'Fundamentals of React',
          exercises: 10
          },
        {
          name: 'Using props to pass data',
          exercises: 7
          },
        {
          name: 'State of a component',
          exercises: 14
        }
    ];

    const Header = ({course}) => {
      console.log('Header: ', course);
      return (
        <h1>{course}</h1>
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

    const Content = ({ parts }) => {
      console.log('Content: ', parts);
      return (
        <>
          <Part name={parts[0].name} exercises={parts[0].exercises} />
          <Part name={parts[1].name} exercises={parts[1].exercises} />
          <Part name={parts[2].name} exercises={parts[2].exercises} />
        </>
      );
    };
           

    const Total = ({parts}) => {
      return (
        <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
      )
    }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App;