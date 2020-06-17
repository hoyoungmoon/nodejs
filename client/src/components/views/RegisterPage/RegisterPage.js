import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom'

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName]=useState("")
    const [Introduce, setIntroduce]=useState("")

    const onInputHandler = (event) => {
        // setEmail(event.currentTarget.value)
        switch (event.target.name) {
            case "email":
                setEmail(event.currentTarget.value)
                break;
            case "password":
                setPassword(event.currentTarget.value)
                break;
            case "name":
                setName(event.currentTarget.value)
                break;
            case "introduce":
                setIntroduce(event.currentTarget.value)
                break;
        }
    }


    const onSubmitHandler = (event)=>{
        event.preventDefault();

        let body = {
            EMAIL: Email,
            PASSWORD: Password,
            INTRODUCE: Introduce,
            NAME:Name
        }
        
        dispatch(registerUser(body)).then(response => {
            console.log(response)
            if (response.payload.registerUser) {
                props.history.push('/login')
            } else {
                alert('error')
            }
        })
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
                <br/>
                <label>Introduce</label>
                <input type="text" value={Introduce} name="introduce" onChange={onInputHandler}/>
                <br/>
                <label>Name</label>
                <input type="text" value={Name} name="name" onChange={onInputHandler}/>
            
                <br/> <br/>
                <button>REGISTER</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
