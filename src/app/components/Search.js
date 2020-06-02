import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../actions/fetchWeather';
import { fetchNextDays } from '../actions/fetchNextDays';
import Autocomplete from "./Autocomplete";
import { saveCity } from '../actions/saveCity';
import { connect } from 'react-redux'
import { getGeoposition } from '../services/apiRequests'

import '../styles/Search.css'
const mapStateToProps = (state) => {
  return {
    state
  }
}

function Search(params) {

    const dispatch = useDispatch();
    const getWeatherInfoAction = (city) => dispatch(fetchWeather(city));  
    const getNextDaysAction = (city) => dispatch(fetchNextDays(city));  
    const saveCityAction = (city) => dispatch(saveCity(city));
    let City = {};
    useEffect(() => {
      const geo = navigator.geolocation;
      geo.getCurrentPosition(success,error)
    },[])
    function success(pos) {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      let correntPos = "";
      getGeoposition(lat,lon).then(res => {
        correntPos = res
        if(correntPos){
          getWeatherInfoAction(correntPos.Key);
          getNextDaysAction(correntPos.Key);
          const objN = {};
          objN[correntPos["Key"]] = correntPos.LocalizedName;
          saveCityAction(objN);
        }
      });        
      }
      
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    function selectCity(city){
        if(city){
          City = city;
        }
      }

    const Submitfrom = (e) => {
      e.preventDefault();
      const keys = Object.keys(City);
      if(keys.length !== 0){
        const cityId = keys[0];
        getWeatherInfoAction(cityId);
        getNextDaysAction(cityId);
        saveCityAction(City);

      } else{
        console.log("no city");
      }
    }

    return (
        <div className="control">
              
              <form onSubmit={Submitfrom}>
                <div >            
                <Autocomplete 
                    suggestions={[]}
                    selectCity={selectCity}/>
                </div>
                <input type="submit" value="Check Weather"/>
              </form>
        </div>
    )
}

export default connect(mapStateToProps)(Search);
