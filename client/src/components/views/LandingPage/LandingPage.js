import React, { useEffect, useState, Component } from 'react'
import axios from 'axios'
import LandingInputPage from './LandingInputPage'
import PhoneInfo from './PhoneInfo'
import PhoneInfoList from './PhoneInfoList'
import FeedItem from './FeedItem'
import {withRouter} from 'react-router-dom'

const LandingPage = withRouter((props) => {

    const [Feeds, setFeeds] = useState([])

    useEffect(() => {
        axios.get('http://localhost:80/api/feed')
            .then(response => {
                setFeeds(response.data.result)
            })
    }, [])

    const addFeeds = (addObject) => {
        setFeeds([
            ...Feeds, addObject
        ]);
    };

    const onClickHandler = () => {
        axios.post('http://localhost:80/api/user/logout')
            .then(response => {
                console.log(response)
                if (response.data.logout) {
                    props.history.push('/login')
                } else {
                    alert('failed to logout')
                }
            })
    }

    const onClickRegister = () => {
        props.history.push('/feed')
    }

    const feedList = Feeds.map((feed) => (<FeedItem info={feed}/>));
    return (
        
        <div style={{
            display: 'flex', flex:'1', flexDirection:'column',
            justifyContent: 'center', alignItems: 'center', padding: '100px',
           
        }}>
            
            <button onClick={onClickHandler}>로그아웃</button>
            <button onClick={onClickRegister}>피드 등록</button>
            {feedList}
        </div>
    )
}
)

// class LandingPage extends Component {

//     id = 2;
//     state = {
//         information: [
//             {
//                 id: 0,
//                 name: '홍길동',
//                 phone: '010-0000-0000'
//             }
//         ],
//         keyword: ''
//     }

//     handleChange = (event) => {
//         this.setState({
//             keyword: event.target.value
//         })
//     }
//     handleCreate = (data) => {
//         const { information } = this.state;
//         this.setState({
//             information: information.concat({ id: this.id++, ...data })
//         })
//     }

//     handleRemove = (id) => {
//         const { information } = this.state;
//         this.setState({
//             information: information.filter(info => info.id !== id)
//         })
//     }
//     handleUpdate = (id, data) => {
//         const { information } = this.state;
//         this.setState({
//             information: information.map(
//                 info => id === info.id ? { ...info, ...data } : info
//             )
//         })
//     }
//     render() {
//         const { information, keyword } = this.state
//         const filteredList = information.filter(
//             info => info.name.indexOf(keyword) !== -1
//         )

//         const style = {
    
//             padding: '20px',
//             margin: '20px'
//         }
//         return (
//             <form style={style}>
//                 <div>
//                     <LandingInputPage onCreate={this.handleCreate} />
//                     <p>
//                         <input
//                             placeholder='검색할 이름을 입력하세요'
//                             onChange={this.handleChange}
//                             value={keyword} />
//                     </p>
//                     <PhoneInfoList data={filteredList}
//                         onRemove={this.handleRemove}
//                         onUpdate={this.handleUpdate} />
//                 </div>
//             </form>
//         )
//     }
// }

export default withRouter(LandingPage);
