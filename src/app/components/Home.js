import React, {Component} from 'react'
import Search from '../components/Search';
import reducer from '../reducers/weatherReducer'
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux'
import { addFavorits } from '../actions/addFavorits';

import 'bootstrap/dist/css/bootstrap.min.css';
import Details from './Details';
import NextDays from './NextDays';
const mapStateToProps = (state) => {
    return {
      state
    }
  }
  const isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0;
  }
 class Home extends Component {
    constructor(props) {
        super(props);

      }
       addFavorite(addFavoritsAction,weatherData, favoritsList,selectedCity) {
            console.log(weatherData, favoritsList,selectedCity);
            if(!isEmptyObject(weatherData) && !isEmptyObject(selectedCity)){
              if(isEmptyObject(favoritsList))
                addFavoritsAction(Object.assign(favoritsList,selectedCity));
              else if(!isEmptyObject(favoritsList) && !favoritsList[selectedCity.key])
                addFavoritsAction(Object.assign(favoritsList,selectedCity));
            }
        }
    render() {
      const addFavoritsAction = (favorits) => this.props.dispatch(addFavorits(favorits));

    
    const weatherData = this.props.state.WeatherInfo && this.props.state.WeatherInfo.weatherInfo;
    const nextDays = this.props.state.NextDays && this.props.state.NextDays.nextDays && this.props.state.NextDays.nextDays.DailyForecasts;
    const selectedCity = this.props.state.WeatherInfo.selectedCity;
    let favoritsList = this.props.state.Favorits.favorits;
    let favoriteDisabled = isEmptyObject(selectedCity)? true : false;
         return ( 
            <div>
                <h2>Home</h2><input type="submit" 
                disabled={favoriteDisabled} 
                value="Add To Favorits List" 
                onClick={() => this.addFavorite(addFavoritsAction,weatherData, favoritsList, selectedCity)}/>
                <Search></Search>
                <Details weatherData={weatherData} selectedCity={selectedCity}></Details>
                <NextDays nextDays={nextDays}></NextDays>
            </div>
        )
    }
}
export default connect(mapStateToProps)(Home);