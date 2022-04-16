import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { API_URL } from "../env";
import { getOrders } from "../state/actions";
import Card from "./components/Card";


export default () => {

    const orders = useSelector(state => state.products.orders)
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        if(auth.isAuthenticated){
            dispatch(getOrders(auth.token))
        } else {
            navigate('/login')
        }
    },[])

    return(
        <>
            { orders.length ? (
                <>
                <div className="pt-40 pl-40 d-flex">
                    <button className="button btn-previous" onClick={() => navigate(-1)}>
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                    <h1>Мои Заказы</h1>
                </div>
                { orders.map((el) => (
                    <>
                        <div className="titleOrders">
                            <h2>Заказ #{el.id}</h2>
                            <span><h2>Дата:</h2><p>{el.date}</p></span>
                        </div>
                        <div className="product-row">
                            {el.products.map((product) => <Card el={product} key={product.id} />)}
                        </div>
                        <div className="delivered">{el.delivered ? (<b style={{color: "#89c30e"}}>Доставлено</b>):(<b style={{color: "#fcb858"}}>В процессе доставки</b>)}</div>
                    </>
                ))}
                </>
             ) : (

            <div className="favouriteEmpty">
                 <img src={"/static/smale.png"}/>
                 <h3>У вас нет заказов</h3>
                 <p>Оформите хотябы один заказ.</p>
                 <button onClick={() => navigate(-1)} className="btn-success btn-back">
                     <i className="fa-solid fa-arrow-left"></i>
                     <span>Вернуться назад</span>
                 </button>
             </div>
             )}
        </>
    )
}