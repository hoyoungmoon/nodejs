import {REGISTER_FEED} from '../_actions/types'

export default function (state={}, action){
    switch (action.type){
         case REGISTER_FEED:
            return { ...state, feed: action.payload }

            
        default:
            return state;
    }
}