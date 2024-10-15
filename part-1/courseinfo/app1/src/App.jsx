const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const Header = () => {
    return (
      <h1>{course}</h1>
    )
  }

  const Content = () => {
    const Part1 = () => {
      return (
        <p>
          {part1} {exercises1}
        </p>
      )
    }
    const Part2 = () => {
      return (
        <p>
          {part2} {exercises2}
        </p>
      )
    }
    const Part3 =() => {
      return (
        <p>
          {part3} {exercises3}
        </p>
      )
    }
    return (
      <>
        <Part1/>
        <Part2/>
        <Part3/>
      </>
    )
  }

  const Total = () => {
    return (
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    )
  }

  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  )
}

export default App;