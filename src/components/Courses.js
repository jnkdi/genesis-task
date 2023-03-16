import { useState, useEffect } from "react";
import { getCoursesRequest } from "../api/api";
import CoursePreview from "./CoursePreview";
import "../css/Courses.css";

function Courses() {
  const PAGINATION_LIMIT = 9;
  const [courses, setCourses] = useState([]);
  const [offset, setOffset] = useState(0);

  function loadMore() {
    setOffset((prevValue) => prevValue + PAGINATION_LIMIT);
  }

  useEffect(() => {
    getCoursesRequest().then((response) => {
      setCourses(response);
    });
  }, []);

  const coursesWithPag = courses.slice(0, offset + PAGINATION_LIMIT);

  return (
    <div className="courses">
      <h1 className="courses__title">Courses</h1>
      <div className="courses__cards">
        {coursesWithPag.map((course) => (
          <CoursePreview course={course} key={course.id} />
        ))}
      </div>
      <a onClick={loadMore} className="courses__load-button">
        Load more
      </a>
    </div>
  );
}

export default Courses;
