const weatherInfo = (state = {
    weatherInfo:{},
    selectedCity:{}
}, action) => {
    if(action.type === "FETCH_WEATHER"){
        state = {...state, weatherInfo:action.payload}
    }
    if(action.type === "SELECT_CITY"){
        state = {...state, selectedCity:action.payload}
    }
    return state;
}

export default weatherInfo;