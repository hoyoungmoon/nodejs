import React, {useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router'



function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onInputHandler = (event) => {
        // setEmail(event.currentTarget.value)
        switch (event.target.name) {
            case "email":
                setEmail(event.currentTarget.value)
                break;
            case "password":
                setPassword(event.currentTarget.value)
                break;
        }
    }


    const onSubmitHandler = (event)=>{
        event.preventDefault();

        let body = {
            EMAIL: Email,
            PASSWORD: Password
        }
        
        dispatch(loginUser(body)).then(response => {
            console.log("loginUser",response)
            if (response.payload.login) {
                props.history.push('/')
            } else {
                alert('error')
            }
        })
    }

    const onClickHandler = ()=>{
        props.history.push('/register')
    }
    
    return (
        <div style={{
            display: 'flex', justifyContent:'center', alignItems:'center',
            width:'100%', height:'100vh'
        }}>
            <form style={{display:'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="emial" value={Email} name="email" onChange={onInputHandler}/>
                <br/>
                <label>Password</label>
                <input type="password" value={Password} name="password" onChange={onInputHandler}/>
                <br/> <br/>
                <button>LOGIN</button>
                <button onClick={onClickHandler}>REGISTER</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
