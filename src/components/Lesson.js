import "../css/Lesson.css";

function Lesson({ lesson, setVideoURL, setTitle, setLessonNumber, className, setLessonStatus, setLessonPreview}) {

  function pickLesson() {
    setLessonStatus(lesson.status)
    setVideoURL(lesson.link);
    setLessonNumber(lesson.order);
    setLessonPreview(lesson.previewImageLink);
    setTitle(() => lesson.title);
  }
  return (
    <div onClick={pickLesson} className={className}>
      <div className="lesson__preview"/>
      <div className="lesson__description">
        <h3 className="lesson__title">{lesson.title}</h3>
        <div className="lesson__duration">0{Math.floor(lesson.duration / 60)}:{lesson.duration % 60} min</div>
      </div>
    </div>
  );
}

export default Lesson;
