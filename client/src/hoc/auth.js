import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'

export default function(SpecificComponent, option, adminRoute = null){
    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        const [userId, setUserId] = useState('')
        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log("client Auth : ", response)
                setUserId(response.payload.IDX)
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    if (option === false) {
                        props.history.push('/')
                    }
                }

            })
        }, [])

        return (
            <SpecificComponent userId={userId}/>
        )
    }

    return AuthenticationCheck
}