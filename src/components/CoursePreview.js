import { useState, useEffect } from "react";
import { getCourseRequest } from "../api/api";
import Rating from "./Rating";
import "../css/CoursePreview.css";
import { useNavigate } from "react-router-dom";

function CoursePreview({ course }) {
  const navigate = useNavigate();
  function routeChange() {
    navigate(`/${course.id}`);
  }
  if (!course) {
    return <></>;
  }

  const { title, description, meta, lessonsCount, rating, tags } = course;
  return (
    <article onClick={routeChange} className="course-preview__card">
      <div className="course-preview__header">
        <a className="course-preview__img">
          {meta.courseVideoPreview && (
            <img
              src={`https://wisey.app/assets/images/web/course-covers/${meta.slug}/cover.webp`}
            ></img>
          )}
        </a>
        <p className="course-preview__lessons">{lessonsCount} lessons</p>
      </div>
      <div className="course-preview__content">
        <div className="course-preview__text">
          <h2 className="course-preview__title">{title}</h2>
          <p className="course-preview__description">{description}</p>
        </div>
        <div className="course-preview__tags">
          <p className="course-preview__label">{tags[0]}</p>
          <div form-item>
            <Rating ratingValue={rating} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default CoursePreview;
