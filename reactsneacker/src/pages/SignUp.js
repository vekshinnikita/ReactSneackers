import React, { useState } from 'react'
import { TextField } from "@mui/material";
import { handleChange } from "../services/masks";
import { signupUser } from '../state/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callAlert } from '../services/callAlert';


export default () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        last_name: "",
        first_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = () =>{
        let array = []
        let type = ''
        if ((values.password === values.confirmPassword) && (values.email !== "") && (values.password !== "")){
            dispatch(signupUser({ 
                last_name: values.last_name,
                first_name: values.first_name,
                email: values.email.toLowerCase(),
                password: values.password,
            },navigate))
        } else {
            type = 'error'
            if ((values.password !== values.confirmPassword)){  
                array.push('Пароли не совпадают')
            }
            if((values.email === "")){
                array.push('Поле email не может быть пустым')
            }
            if(values.password === ""){
                array.push('Поле пароль не может быть пустым')
            }
        }
        if (array){
            callAlert(array,type,dispatch)
        }
    }   

    return (
        <div className="wrap-signin">
            <div className="signin">
                <TextField
                    className="mb-10 profileInput" 
                    fullWidth
                    name="last_name"
                    id="last_name"
                    onChange={(event) => handleChange(event, values, setValues)}
                    label="Фамилия"
                    variant="standard"/>
                <TextField
                    className="mb-10 profileInput"
                    fullWidth
                    name="first_name"
                    id="first_name"
                    onChange={(event) => handleChange(event, values, setValues)}
                    label="Имя"
                    variant="standard"
                    />
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
                    onChange={(event) => handleChange(event, values, setValues)}
                    className="mb-10 profileInput"
                    name="password"
                    id="password"
                    label="Пароль"
                    variant="standard"
                    type="password"
                    />
                <TextField
                    fullWidth
                    onChange={(event) => handleChange(event, values, setValues)}
                    className="mb-10 profileInput"
                        label="Подтвердите пароль"
                        variant="standard"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                    />
                                  
            <button className="btn-profile" onClick={handleSubmit}>
                Зарегистироваться
            </button>
            
            </div>
        </div>
        
        
    )
}