import React from "react";
import { CSSTransition } from "react-transition-group"
import { useSelector } from "react-redux"
import Alert from '@mui/material/Alert';


export default (props) =>{
    
    const state = useSelector(state => state.components)

    return (
        <div className="alert-errors">
            {state.alerts.map((e) => (
                <CSSTransition in={state.showAlert} timeout={500} classNames="dropdown-alert" unmountOnExit>
                    <div>
                    <Alert severity={state.type}>{e}</Alert>
                    </div>
                </CSSTransition>
            ))}
        
        </div>
    )
}