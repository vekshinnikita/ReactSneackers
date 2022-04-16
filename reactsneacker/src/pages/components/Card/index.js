import React, { useState } from "react";
import styles from './Card.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { splitPrice } from '../../../services/service'
import { addProductBasket, addProductFavourite, getDetailProduct, removeProductBasket, removeProductFavourite } from '../../../state/actions'
import RatingStars from "../RatingStars";



export default (props) => {

    const dispatch = useDispatch() 
    const basket = useSelector(state => state.basket.basket)
    const favourite = useSelector(state => state.favourite.favourite)
    

    const activeBasket = basket.some(el => el.id === props.el.id)

    function handleCheckboxAdd(){
        if (basket.some(el => el.id === props.el.id)){
            dispatch(removeProductBasket(props.el))
        } else{
            dispatch(addProductBasket(props.el))
        }
        
    }

    function handleCheckboxFavourite(){
        if (favourite.some(el => el.id === props.el.id)){
            dispatch(removeProductFavourite(props.el))
        } else{
            dispatch(addProductFavourite(props.el))
        }
    }

    const handleModal = () =>{
        props.setModal(true)
        dispatch(getDetailProduct(props.el.id))
    }

    return(
        <>
            <div onClick={handleModal} className={styles.card}>
            
                
                <div className={styles.img}>
                    <img src={props.el.url_poster} />
                </div>
                <div style={{position: 'absolute'}} onClick={e => e.stopPropagation()}>
                    <input  
                        type="checkbox" 
                        className="checkbox-like" 
                        onChange={() => handleCheckboxFavourite()}
                        id={'like' + props.el.id}
                        checked={favourite.some(el => el.id === props.el.id)}/>
                    <label 
                        className="button btn-like" 
                        htmlFor={'like' + props.el.id}
                        >
                            <b><i className="fas fa-heart"></i></b>
                    </label>
                    
                </div>
                <div className={styles.middleRating}>
                    <RatingStars stars={props.el.middle_star}/>
                </div>
                
                <h5>{props.el.title}</h5>
                <div className="d-flex justify-between">
                    <div className={styles.price}>
                        <span>цена:</span>
                        <b>{splitPrice(props.el.price)} руб.</b>
                    </div>
                    <div onClick={e => e.stopPropagation()}>
                        <input 
                            type="checkbox" 
                            className="checkbox-add" 
                            onChange={() => handleCheckboxAdd()}
                            id={'add' + props.el.id}
                            checked={activeBasket}/>

                        <label className="hover-add button" htmlFor={'add' + props.el.id}>
                            <i className="fa-solid fa-plus"></i>
                        </label>
                    </div>
                </div>
            </div>  
            </>
    )
}