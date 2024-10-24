const Header = ({ course }) => {
    console.log('Header: ', course);
    return (
      <div>
        <h1>{course.nameHeader}</h1>
        <h2>{course.name}</h2>
      </div>
    );
  };
  
  const Part = ({ name, exercises }) => {
    console.log('Part: ', name, exercises);
    return (
      <p>
        {name}: {exercises}
      </p>
    );
  };
  
  const Content = ({ course }) => {
    console.log('Content: ', course);
    return (
      <>
        {course.parts.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </>
    );
  };
  
  const Total = ({ course }) => {
    console.log('Total: ', course);
    const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);
    return (
      <p>
        <strong>Number of exercises {total}</strong>
      </p>
    );
  };
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    );
  };

export default Course;