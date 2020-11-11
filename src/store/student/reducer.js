import * as actionTypes from "./actions"

const initialState = {
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.MODIFY_STATE:
            return {...state, ...action.newState};
    }
    return state;
}

export default reducer;