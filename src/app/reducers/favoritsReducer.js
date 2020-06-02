const favorits = (state = {
    favorits:{}
}, action) => {
    if(action.type === "ADD_TO_FAVORITS"){
        state = {...state, favorits:action.payload}
    }
    return state;
}

export default favorits;