import '../css/Lesson.css'

function Lesson({lesson, setVideoURL}) {
  console.log(lesson.previewImageLink);
  console.log(lesson.order);
  return(
    <div onClick={() => setVideoURL()} className="lesson">
      <img className="lesson__img" src={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}/>
      <div className='overlay'></div>
      <h3>{lesson.title}</h3>
    </div>
  )
}

export default Lesson;