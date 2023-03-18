import { useState, useEffect, useRef, useCallback } from "react";
import { getCourseRequest } from "../api/api";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import classNames from "classnames";
import "../css/Course.css";
import Lesson from "./Lesson";

function Course({}) {
  const [course, setCourse] = useState(null);
  const [videoURL, setVideoURL] = useState(
    course ? course.meta.courseVideoPreview.link : null
  );
  const [title, setTitle] = useState(course ? course.title : null);
  const [lessonNumber, setLessonNumber] = useState(1);
  const [lessonStatus, setLessonStatus] = useState("unlocked");
  const [lessonPreview, setLessonPreview] = useState("");
  const [currentLessonId, setCurrentLessonId] = useState(1);

  const { id: courseId } = useParams();

  const timeshtampsStorage = JSON.parse(
    window.localStorage.getItem("timeStamps") || "{}"
  );
  const courseTimeshtampsStorage = timeshtampsStorage
    ? timeshtampsStorage[courseId]
    : {};
  const [timeStamps, setTimeStamps] = useState(courseTimeshtampsStorage || {});

  const playerRef = useRef();

  useEffect(() => {
    window.localStorage.setItem(
      "timeStamps",
      JSON.stringify({ ...timeshtampsStorage, [courseId]: timeStamps })
    );
  }, [timeStamps]);

  useEffect(() => {
    getCourseRequest(courseId).then((response) => {
      setCourse(response);

      let index = response.lessons.indexOf(
        response.lessons.find((lesson) => lesson.status == "unlocked")
      );

      setCurrentLessonId(response.lessons[index].id);
      setTitle(response.lessons[index].title);

      setVideoURL(response.lessons[index].link);
    });
  }, []);

  const onReady = () => {
    playerRef.current.seekTo(timeStamps[currentLessonId], "seconds");
  };

  if (!course) {
    return <></>;
  }

  return (
    <div className="course">
      <nav className="course__nav">
        <div className="course-nav__container">
          <Link to={"/"} className="logo"></Link>
          <h3 className="course__nav-title">COURSE NAVIGATION</h3>
          <div className="course__lessons">
            {course.lessons.map((lesson) => (
              <Lesson
                key={lesson.id}
                lesson={lesson}
                setVideoURL={setVideoURL}
                setTitle={setTitle}
                setLessonNumber={setLessonNumber}
                setLessonStatus={setLessonStatus}
                setLessonPreview={setLessonPreview}
                setTimeStamps={setTimeStamps}
                setCurrentLessonId={setCurrentLessonId}
                className={classNames(
                  "lesson",
                  { "lesson-active": lesson.order == lessonNumber },
                  { "lesson-locked": lesson.status == "locked" }
                )}
              />
            ))}
          </div>
        </div>
      </nav>
      <div className="course__main">
        <h2 className="course__title">
          Episode {lessonNumber}. {title}
        </h2>
        <div className="lesson__content">
          {lessonStatus == "unlocked" ? (
            (course.meta.courseVideoPreview && (
              <ReactPlayer
                className="course-main-video"
                url={videoURL}
                playing={true}
                controls={true}
                muted={true}
                ref={playerRef}
                onProgress={(...params) => {
                  setTimeStamps((prevValue) => {
                    return {
                      ...prevValue,
                      [currentLessonId]: params[0].playedSeconds,
                    };
                  });
                }}
                onReady={onReady}
              ></ReactPlayer>
            )) || <img src={lessonPreview}></img>
          ) : (
            <div
              className="locked"
              style={{
                backgroundImage: `url(${lessonPreview}/lesson-${lessonNumber}.webp)`,
              }}
            >
              <div className="locked__overlay">
                <div className="locked__icon"></div>
                <p className="locked__text">
                  Stay tuned for the new episode coming up next week
                </p>
                <button className="locked__button">Remind me</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Course;
