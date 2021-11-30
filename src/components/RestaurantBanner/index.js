import {FaStar, FaRupeeSign} from 'react-icons/fa'

import './index.css'

const RestaurantBanner = props => {
  const {restaurantData} = props
  const {
    name,
    imageUrl,
    cuisine,
    location,
    rating,
    costForTwo,
    reviewsCount,
  } = restaurantData

  return (
    <div className="banner-bg">
      <div className="banner-container">
        <img src={imageUrl} alt="restaurant" className="res-image" />
        <div className="res-info">
          <h1 className="res-name">{name}</h1>
          <p className="res-cuisine">{cuisine}</p>
          <p className="res-location">{location}</p>
          <div className="rating-rate-container">
            <div className="rating-container">
              <p className="rating">
                <FaStar />
                {rating}
              </p>
              <p className="sub-text">{reviewsCount}+ Ratings</p>
            </div>
            <hr className="separation-line" />
            <div className="rating-container">
              <p className="rating">
                <FaRupeeSign />
                {costForTwo}
              </p>
              <p className="sub-text">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantBanner
