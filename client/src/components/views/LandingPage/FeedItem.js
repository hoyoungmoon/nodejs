import React from 'react'
import FeedReply from './FeedReply'
function FeedItem(props) {

    
    const style = {
        border: '1px solid black',
        padding: '8px',
        margin: '8px'
    }

    return (

        <div style={style}>
            <img style = {{width:'500px', height:'300px'}} src={props.info.PATH}/>
            <div><b>{props.info.CONTENT}</b></div>
            <div>FEED_LIKE : {props.info.FEED_LIKE}</div>
            <FeedReply feedIdx = {props.info.IDX}/>
        </div>

    );
}

export default FeedItem
