import { getForCity } from '../services/apiRequests'

export function fetchWeather(city) {
    return function(dispatch) {
        const data = getForCity(city).then(res => {
          dispatch({type:"FETCH_WEATHER", payload: res})});
        
        
    }
}