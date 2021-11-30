import {Component} from 'react'

import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import RestaurantsHeader from '../RestaurantsHeader'
import RestaurantCard from '../RestaurantCard'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class PopularRestaurants extends Component {
  state = {
    restaurantsList: [],
    isLoading: false,
    activePage: 1,
    sortOption: sortByOptions[1].value,
    totalPages: 0,
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = async () => {
    this.setState({isLoading: true})
    const {activePage, sortOption} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const totalRestaurants = data.total
    const totalPages = Math.ceil(totalRestaurants / limit)
    const updatedData = data.restaurants.map(eachItem => ({
      id: eachItem.id,
      cuisine: eachItem.cuisine,
      imageUrl: eachItem.image_url,
      name: eachItem.name,
      rating: eachItem.user_rating.rating,
      totalReviews: eachItem.user_rating.total_reviews,
    }))
    this.setState({
      restaurantsList: updatedData,
      isLoading: false,
      totalPages,
    })
  }

  updateOption = option => {
    this.setState({sortOption: option}, this.getRestaurants)
  }

  decrementPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurants,
      )
    }
  }

  incrementPage = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurants,
      )
    }
  }

  renderPopularRestaurants = () => {
    const {restaurantsList, sortOption, activePage, totalPages} = this.state
    return (
      <>
        <RestaurantsHeader
          sortOption={sortOption}
          sortByOptions={sortByOptions}
          updateOption={this.updateOption}
        />
        <hr className="hr-line" />
        <ul className="restaurants-list">
          {restaurantsList.map(eachItem => (
            <RestaurantCard restaurant={eachItem} key={eachItem.id} />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            className="pagination-button"
            onClick={this.decrementPage}
            testid="pagination-left-button"
          >
            <RiArrowDropLeftLine size={20} />
          </button>
          <p testid="active-page-number" className="page-count">
            {activePage}
          </p>
          <span
            className="page-count"
            style={{marginLeft: '5px', marginRight: '5px'}}
          >
            of
          </span>
          <p className="page-count"> {totalPages}</p>
          <button
            type="button"
            className="pagination-button"
            onClick={this.incrementPage}
            testid="pagination-right-button"
          >
            <RiArrowDropRightLine size={20} />
          </button>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="carousel-loader" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderPopularRestaurants()
  }
}

export default PopularRestaurants
