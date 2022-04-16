import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../env";
import { callAlert } from "../../services/callAlert";
import { splitPrice } from "../../services/service";
import { makeOrder, removeProductBasket } from "../../state/actions";
import styles from './Basket.module.scss'

export default (props) => {

    const basket = useSelector(state => state.basket.basket)
    const totalPrice = useSelector(state => state.basket.total)
    const auth = useSelector(state => state.auth)
    let tax = Math.trunc(totalPrice*0.05)
    const dispatch = useDispatch()
    const numderOrder = useSelector(state => state.products.numderOrder) 


    
    const handleOrder = () => {
        
        const user = auth.user
        const errors = []

        
        if(auth.isAuthenticated){
            if(user.address && user.first_name && user.first_name && user.phone){
                const idsProduct = basket.map(item => item.id)
                dispatch(makeOrder(idsProduct, auth.token))
                console.log('good')
            } else{
                errors.push('Для того чтобы сделать заказ у пользователя должны быть указаны поля: Фамилия, Имя, Телефон, Адресс доставки')
            }
        } else{
            errors.push('Для того чтобы сделать заказ вы должны войти в аккаунт')
        }
        callAlert(errors, 'error', dispatch)
    }

    return (
        <>
        <div onClick={() => props.setBasket(false)} className={props.basket ? styles.overlay +' '+ styles.overlayActive : styles.overlay}>
        </div>
            <div className={props.basket ? styles.basket +' '+ styles.basketActive : styles.basket}>
                <h1>Корзина</h1>

            { basket.length ? (
                <>
                <div className={styles.cardsRow}>   
                { basket.map( el => (
                    <div className={styles.card} key={el.id}>
                        <img src={el.url_poster} />
                        <div>
                            <p>{el.title}</p>
                            <b>{splitPrice(el.price)} руб.</b>
                        </div>
                        <div className="flex d-flex justify-end mr-15">
                            <button className="button btn-delete" onClick={() => dispatch(removeProductBasket(el))}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
                ))}    
                </div>

                <ul className={styles.totalPrice}>
                    <li className="d-flex">
                        <span>Итого:</span>
                        <div></div>
                        <b>{splitPrice(totalPrice)} руб.</b>
                    </li>       
                    <li className="d-flex">
                        <span>Налог 5%:</span>
                        <div></div>
                        <b>{splitPrice(tax)} руб.</b>
                    </li>
                    
                    <button className="btn-success btn-order" onClick={handleOrder}>
                        <span>Оформить заказ</span> 
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </ul>
                </>
            ):( 
                
                
                <div className={styles.emptyBasket +' d-flex flex-column justify-center align-center flex'}>
                    { numderOrder ? (
                        <>
                            <img src={"/static/paper.png"}/>
                            <h3
                                style={{color: "#89c30e"}}
                            >Заказ Оформлен!</h3>
                            <p>Номер вашего заказа <b style={{color: "#000"}}>#{numderOrder}</b><br/>
                            Заказ скоро будет передан курьерной доставкой</p>
                            <p></p>
                        </>
                        
                    ):(
                        <>
                            <img src="/static/box.png"/>
                            <h3>Корзина пустая</h3>
                            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                        </>
                    )}


                    <button onClick={() => props.setBasket(false)} className="btn-success btn-back">
                        <i className="fa-solid fa-arrow-left"></i>
                        <span>Вернуться назад</span>
                    </button>
                </div>
            
            )}
            </div>
        </>
    )
}