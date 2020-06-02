import { getForFiveDays } from '../services/apiRequests'

export function fetchNextDays(city) {
    return function(dispatch) {        
        const data = getForFiveDays(city).then(res => {
          dispatch({type:"FETCH_NEXTDAYS", payload: res})});
        
    }
}