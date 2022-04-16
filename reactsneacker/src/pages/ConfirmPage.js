import React, { useState } from 'react'
import { TextField } from "@mui/material";
import { handleChange } from "../services/masks";
import { confirmPassword } from '../state/actions';
import { useDispatch } from 'react-redux';
import { callAlert } from '../services/callAlert';
import { useNavigate, useParams } from 'react-router-dom';


export default () => {

    const {uid,token} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        new_password: "",
        confirmPassword: "",
    });

      const handleSubmit = () =>{
        let array = []
        let type = ''
        if ((values.new_password === values.confirmPassword) && (values.new_password !== "")){
            dispatch(confirmPassword({ 
                new_password: values.new_password,
                uid,
                token
            },navigate))
        } else {
            type = 'error'
            if ((values.new_password !== values.confirmPassword)){  
                array.push('Пароли не совпадают')
            }
            if(values.new_password === ""){
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
                    fullWidth
                    onChange={(event) => handleChange(event, values, setValues)}
                    className="mb-10"
                    name="new_password"
                    id="new_password"
                    label="Пароль"
                    variant="standard"
                    type="password"
                    />
            <TextField
                fullWidth
                onChange={(event) => handleChange(event, values, setValues)}
                className="mb-10"
                    label="Подтвердите пароль"
                    variant="standard"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                />
                <button className="btn-profile" onClick={handleSubmit}>Сменить пароль</button>
             </div>
        </div>
    )
}