import { combineReducers } from 'redux';
import weatherInfo from './weatherReducer';
import nextDays from './nextDaysReducer';
import favorits from './favoritsReducer';


const reducers = combineReducers({
    WeatherInfo:weatherInfo,
    NextDays:nextDays,
    Favorits:favorits
});

export default reducers;