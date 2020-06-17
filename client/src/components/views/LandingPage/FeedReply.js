import React, {useState, useEffect} from 'react'
import axios from 'axios'

function FeedReply(props) {
// props.feedIdx로 받아오자
    const [FeedReplys, setFeedReplys]=useState([])

    
    useEffect(() => {
        axios.get('http://localhost:80/api/feedReply', {
            params: {
              feedIdx: props.feedIdx
            }})
            .then(response => {
                console.log(response.data.result)
                setFeedReplys(response.data.result)
            })
    }, [])

    const style = {
        border: '1px solid black',
        padding: '8px',
        margin: '8px'
    }


    return (            



        <div style={style}>
          
        </div>

    );
}


export default FeedReply
