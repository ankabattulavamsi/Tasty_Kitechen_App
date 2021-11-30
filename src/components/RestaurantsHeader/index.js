import {BsFilterLeft} from 'react-icons/bs'

import './index.css'

const RestaurantHeader = props => {
  const {sortOption, sortByOptions, updateOption} = props

  const onChangeSort = event => {
    updateOption(event.target.value)
  }

  return (
    <div className="restaurant-header">
      <h1 className="popular-heading">Popular Restaurants</h1>
      <div className="select-container">
        <p className="select-text">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="sort-container">
          <BsFilterLeft size={20} />
          <p className="sort-text">Sort By</p>
          <select
            value={sortOption}
            className="select-options"
            onChange={onChangeSort}
          >
            {sortByOptions.map(eachOption => (
              <option
                key={eachOption.id}
                value={eachOption.value}
                className="option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default RestaurantHeader
