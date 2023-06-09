import "../css/Rating.css";

function Rating({ ratingValue }) {
  return (
    <div className="rating">
      {/* <div className='rating__value'>{ratingValue}</div> */}
      <div className="rating__body">
        <div
          className="rating__active"
          style={{ width: `${ratingValue * 20}%` }}
        ></div>
        <div className="rating__items">
          <input
            type="radio"
            className="rating__item"
            value={1}
            name="rating"
          />
          <input
            type="radio"
            className="rating__item"
            value={2}
            name="rating"
          />
          <input
            type="radio"
            className="rating__item"
            value={3}
            name="rating"
          />
          <input
            type="radio"
            className="rating__item"
            value={4}
            name="rating"
          />
          <input
            type="radio"
            className="rating__item"
            value={5}
            name="rating"
          />
        </div>
      </div>
    </div>
  );
}

export default Rating;
