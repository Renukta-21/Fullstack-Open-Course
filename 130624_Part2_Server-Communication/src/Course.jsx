function Course({ courses }) {
    return (
        <div>
            {courses.map(course => {
                const total = course.parts.reduce((acumu, part) => acumu + part.exercises, 0)
                return (<div key={course.id}>
                    <h2>{course.name}</h2>
                    <h4>Parts</h4>
                    {course.parts.map(part => (
                        <Part key={part.id} part={part} />
                    ))}
                    <p><strong>total excercises: </strong> {total}</p>
                </div>)
            })}
        </div>
    )
}
function Part({ part }) {
    return <div>
      <p>{part.name}  {part.exercises}</p>
    </div>
  }
export default Course