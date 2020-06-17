import React, { useEffect, Component } from 'react'
import axios from 'axios'

// function LandingPage() {

//     useEffect(() => {
//         axios.get('http://13.125.149.206/api/feed')
//         .then(response => console.log(response.data.result))
//     }, [])

//     return (
//         <div>
//             LandingPage
//         </div>
//     )
// }

class LandingInputPage extends Component {
    
    state = {
        name: '',
        phone: ''
    }

    handleChange = (event)=>{   
        this.setState(
            {[event.target.name]:event.target.value}
          //({name})=>({name:name+event.target.value})
        )
    }

    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        // 상태값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);
        // 상태 초기화
        this.setState({
          name: '',
          phone:''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    
                    <div>값: {this.state.name} {this.state.phone}</div>
                    <input placeholder="이름" name='name' value={this.state.name} onChange={this.handleChange} />
                    <input placeholder="전화번호" name='phone' value={this.state.phone} onChange={this.handleChange} />
                    <button type="submit">등록</button>
                </div>
            </form>
        )
    }
}

export default LandingInputPage;
