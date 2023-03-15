import { useState, useEffect } from "react";
import { getCourseRequest } from "../api/api";
import { useParams } from 'react-router';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lesson from "./Lesson";

function Course({}) {
  const [course, setCourse] = useState(null);
  const [videoURL, setVideoURL] = useState('https://www.youtube.com/embed/eSIJddEieLI?autoplay=1&mute=1') //
  const { id:courseId } = useParams();


  useEffect(() => {getCourseRequest(courseId).then(response => setCourse(response))}, []);

  if(!course) {
    return <></>;
  }
  
  console.log(course, course?.meta, course?.meta?.courseVideoPreview);
  const {title, meta} = course;

  return (
  <div className="course">
    <div className="course__main"></div>
      <h2 className="course__title">{title}</h2>
      {course.meta.courseVideoPreview&&
      (<iframe
        width="420"
        height="315"
        src={videoURL}
        title="YouTube video player"
        frameborder="0"
        className="course-main-video"
      ></iframe>)}
      <div className="course__lessons">
        {course.lessons.map(lesson => <Lesson key={lesson.id} lesson={lesson} setVideoURL={setVideoURL}/>)}
      </div>
  </div>
  
  )
}

export default Course;