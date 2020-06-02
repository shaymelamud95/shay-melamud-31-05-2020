export function addFavorits(favirits) {
    return function(dispatch) {
        dispatch({type:"ADD_TO_FAVORITS", payload: favirits});
    }
}