import React, { useState } from "react";
import { useSelector } from "react-redux";
import { splitPrice } from "../services/service";
import Basket from "./Basket";
import { NavLink } from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
import Loader from "./Loader"
import Alert from "./Alert";
import { API_URL } from "../env";

export default () => {
    const [basket, setBasket] = useState(false)
    const totalPrice = useSelector(state => state.basket.total)
    const [burger, setBurger] = useState(false)
    

    return(
        <>
        <Alert/>
        <Loader/>
        <Basket basket={basket} setBasket={setBasket}/>
        <header className="d-flex flex-row justify-between">
            <NavLink to='/' className="navLink">
                <div className="headerLeft d-flex flex-row">
                    <img height={45} width={45} src={"/static/logo.png"}/>
                    <div className="headerInfo">
                        <h2>React sneakers</h2>
                        <span>Магазин лучших кроссовок</span>
                    </div>
                </div>
            </NavLink>
            <ul className="headerRight d-flex flex-row">
                <li onClick={()=> setBasket(true)}>
                    <i className="fa-solid fa-basket-shopping"></i>
                    <span>
                        {splitPrice(totalPrice)} руб.
                        </span>
                </li>
                <li> <NavLink to='/orders' className="navLink"><i className="fa-solid fa-file-circle-check"></i></NavLink> </li>
                <li> <NavLink to='/favourite' className="navLink"><i className="fa-regular fa-heart"></i></NavLink> </li>
                <li><NavLink to='/profile' className="navLink"><i className="fa-regular fa-circle-user"></i></NavLink></li>
            </ul>
            
            <button className="button btn-burger" onClick={() => setBurger(!burger)} >
                { !burger ? (
                <i className="fa-solid fa-bars"></i>) : (
                <i className="fa-solid fa-xmark"></i>)}
                
            </button>
        </header>
        <div className="pos-r justifu-center flex d-flex">
        { burger && (
            <div onClick={() => setBurger(false)} className="overlay-OP-0"></div>
        )}
        <CSSTransition classNames="burger-anim" in={burger} timeout={400} unmountOnExit>
                <ul className="burger-menu">
                    <li onClick={() => {
                        setBasket(true) 
                        setBurger(false)
                    }}>
                        <i className="fa-solid fa-basket-shopping"></i>
                        <span>
                                Корзина
                            </span>
                    </li>
                    <NavLink to='/orders' className="navLink"><li onClick={() => setBurger(false)} > <i className="fa-solid fa-file-circle-check"></i><span>Заказы</span> </li></NavLink>
                    <NavLink to='/favourite' className="navLink"><li onClick={() => setBurger(false)} > <i className="fa-regular fa-heart"></i><span>Избранное</span></li></NavLink>
                    <NavLink to='/profile' className="navLink"><li onClick={() => setBurger(false)} ><i className="fa-regular fa-circle-user"></i><span>Профиль</span></li></NavLink>
                </ul>
            </CSSTransition>
        </div>
        </>
    )
}