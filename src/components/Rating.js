import '../css/Rating.css';

function Rating({ratingValue}) {
  return (
  <div className="rating">
    <div className="rating-body">
      <div className="rating-active"></div>
      <div className="rating-items">
        <input type="radio" className="rating-item" value={1} name="rating"/>
        <input type="radio" className="rating-item" value={2} name="rating"/>
        <input type="radio" className="rating-item" value={3} name="rating"/>
        <input type="radio" className="rating-item" value={4} name="rating"/>
        <input type="radio" className="rating-item" value={5} name="rating"/>
      </div>
    </div>
  </div>
  )
}

export default Rating;