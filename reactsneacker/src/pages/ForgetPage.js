import React, { useState } from 'react'
import { TextField } from "@mui/material";
import { handleChange } from "../services/masks";
import { resetPassword } from '../state/actions';
import { useDispatch } from 'react-redux';
import { callAlert } from '../services/callAlert';
import { useNavigate } from 'react-router-dom';


export default () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: "",
    });

      const handleSubmit = () =>{
        if (values.email){
            dispatch(resetPassword(values.email.toLowerCase(),navigate))
        } else {
            const errors = []
            const type = 'error'
            if(!values.email){
                errors.push("Поле email не может быть пустым")
            }
            callAlert(errors, type, dispatch)
        }
    }
    

    return (
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
                <button className="btn-profile" onClick={handleSubmit}>Отправить запрос</button>
             </div>
        </div>
    )
}