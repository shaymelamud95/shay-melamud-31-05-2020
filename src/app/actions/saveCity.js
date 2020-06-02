export function saveCity(city) {
    return function(dispatch) {
        dispatch({type:"SELECT_CITY", payload: city});
    }
}