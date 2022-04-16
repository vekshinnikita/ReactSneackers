import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router";

import { TextField } from "@mui/material";
import { handleChange } from "../services/masks";
import { activateUser, getUser, loginUser } from '../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import { callAlert } from '../services/callAlert';
import { NavLink, useParams } from 'react-router-dom';

export default () => {

    const {token,uid} = useParams()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [values, setValues] = useState({
        email: "",
        password: ""
      });

    useEffect(() => {
        if (uid && token){
            dispatch(activateUser({ 
                uid,
                token
            }))
        }

    },[uid,token])

    useEffect(() => {
        if(isAuthenticated){
            dispatch(getUser(auth.token))
            
            navigate("/profile")
        }
    },[isAuthenticated])

    const handleSubmit = () =>{
        if (values.email && values.password){
            dispatch(loginUser({email: values.email.toLowerCase(), password: values.password}))
        } else {
            const errors = []
            const type = 'error'
            if(!values.email){
                errors.push("Поле email не может быть пустым")
            }
            if(!values.password){
                errors.push("Поле пароль не может быть пустым")
            }
            callAlert(errors, type, dispatch)
            

        }
    }

    return(
        <div className="wrap-signin">
            <div className="signin">
                <TextField
                    fullWidth
                    className="mb-10 profileInput"
                    name="email"
                    id="email"
                    label="Email"
                    onChange={(event) => handleChange(event, values, setValues)}
                    variant="standard"
                />
                <TextField
                fullWidth
                className="mb-10 profileInput"
                    label="Пароль"
                    onChange={(event) => handleChange(event, values, setValues)}
                    name="password"
                    id="password"
                    variant="standard"
                    type="password"
                />

                <button className="btn-profile" onClick={handleSubmit}>Войти</button>
                <button className="btn-profile" onClick={() => navigate("/signup")}>Зарегистироваться</button>
                <div className="fogetpass">
                    <NavLink to='/fogetpass'>
                        Забыл пароль?
                    </ NavLink>
                </div>
            </div>
        </div>
    )
}