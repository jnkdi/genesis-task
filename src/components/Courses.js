import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCoursesRequest } from "../api/api";
import CoursePreview from "./CoursePreview";
import { BeatLoader } from "react-spinners";
import "../css/Courses.css";

function Courses() {
  const PAGINATION_LIMIT = 9;
  const [courses, setCourses] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  function loadMore() {
    setOffset((prevValue) => prevValue + PAGINATION_LIMIT);
  }

  useEffect(() => {
    setLoading(true);

    getCoursesRequest().then((response) => {
      setCourses(response);
      setLoading(false);
    });
  }, []);

  const coursesWithPag = courses.slice(0, offset + PAGINATION_LIMIT);

  return (
    <div>
      {loading ? (
        <BeatLoader
          className="loader"
          size={30}
          speedMultiplier={0.8}
          color={"#ea552b"}
          loading={loading}
        />
      ) : (
        <div className="courses">
          <Link to={"/"} className="logo"></Link>
          <div className="courses__cards">
            {coursesWithPag.map((course) => (
              <CoursePreview course={course} key={course.id} />
            ))}
          </div>
          <a onClick={loadMore} className="courses__load-button">
            Load more
          </a>
        </div>
      )}
    </div>
  );
}

export default Courses;
