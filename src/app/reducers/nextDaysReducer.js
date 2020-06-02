const nextDays = (state = {
    nextDays:{}
}, action) => {
    if(action.type === "FETCH_NEXTDAYS"){
        state = {...state, nextDays:action.payload}
    }
    return state;
}

export default nextDays;