import { useState, useEffect } from "react";
import { getCourseRequest } from "../api/api";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Hls from "hls.js";
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
  const { id: courseId } = useParams();

  useEffect(() => {
    getCourseRequest(courseId).then((response) => setCourse(response));
    // const video = this.player;
    // const hls = new Hls();
    // const url = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

    // hls.loadSource(url);
    // hls.attachMedia(video);
    // hls.on(Hls.Events.MANIFEST_PARSED, function() { video.play(); });
  }, []);

  if (!course) {
    return <></>;
  }

  console.log(videoURL);

  return (
    <div className="course">
      <nav className="course__nav">
        <div className="course-nav__container">
          <Link to={'/'} className='course__logo'></Link>
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
            course.meta.courseVideoPreview && (
              <ReactPlayer
                className="course-main-video"
                url={videoURL}
                playing={true}
                controls={true}
                muted={true}
              ></ReactPlayer>
              // <video
              //   className="videoCanvas"
              //   ref={player => (this.player = player)}
              //   autoPlay={true}
              // />
            )
          ) : (
            <div className="locked" style={{backgroundImage: `url(${lessonPreview}/lesson-${lessonNumber}.webp)`}}>
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
