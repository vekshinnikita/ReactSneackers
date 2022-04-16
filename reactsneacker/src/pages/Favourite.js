import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { API_URL } from "../env";
import Card from "./components/Card";


export default () => {

    const favourite = useSelector(state => state.favourite.favourite)
    const navigate = useNavigate()

    return(
        <>
            { favourite.length ? (
                <>
                <div className="pt-40 pl-40 d-flex">
                    <button className="button btn-previous" onClick={() => navigate(-1)}>
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                    <h1>Мои закладки</h1>
                </div>
                <div className="product-row">
                    {favourite.map((el) => <Card el={el} key={el.id} />)}
                </div>
                </>
            ) : (

            <div className="favouriteEmpty">
                <img src={"/static/smale.png"}/>
                <h3>Закладок нет :(</h3>
                <p>Вы ничего не добавляли в закладки</p>
                <button onClick={() => navigate(-1)} className="btn-success btn-back">
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Вернуться назад</span>
                </button>
            </div>
            )}
        </>
    )
}