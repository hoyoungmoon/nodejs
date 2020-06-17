import axios from 'axios';
import { REGISTER_FEED, REGISTER_FEED_REPLY } from './types'


export function registerFeed(dataToSubmit) {
    const request = axios.post('http://localhost:80/api/feed', dataToSubmit)
    .then(response => response.data)
        console.log(request)
    return {
        type: REGISTER_FEED, payload: request
    }
}

export function registerFeedReply(dataToSubmit) {
    const request = axios.post('http://localhost:80/api/feedReply', dataToSubmit)
    .then(response => response.data)
        console.log(request)
    return {
        type: REGISTER_FEED_REPLY, payload: request
    }
}

// export function updateFeed(dataToSubmit) {

//     const request = axios.post('http://localhost:80/api/feed', dataToSubmit)
//     .then(response => response.data)
//         console.log(request)
//     return {
//         type: REGISTER_FEED, payload: request
//     }
// }
