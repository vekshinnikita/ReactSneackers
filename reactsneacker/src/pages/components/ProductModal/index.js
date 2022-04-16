import React, {useState} from 'react';
import Carousel from 'react-elastic-carousel'
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group'
import { API_URL } from '../../../env';
import { callAlert } from '../../../services/callAlert';
import { splitPrice } from '../../../services/service';
import { addProductBasket, leaveReview, removeProductBasket, } from '../../../state/actions';
import RatingStars from '../RatingStars';
import ModalLoading from './ModalLoading';



const DetailProduct = (props) => {
    const product = useSelector(state => state.products.detail)
    const basket = useSelector(state => state.basket.basket)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const activeBasket = basket.some(el => el.id === product.id)
    const dispatch = useDispatch()
    const [isRating, setIsRating] = useState(false)
    const [text, setText] = useState('')
    
    function handleCheckboxAdd(){
        if (activeBasket){
            dispatch(removeProductBasket({
                id: product.id,
                price: product.price,
            }))
        } else{
            dispatch(addProductBasket({
                title: product.title,
                url_poster: product.poster,
                price: product.price,
                id: product.id,
            }))
        }
        
    }
    function handleSubmit(){
        if(text && isAuthenticated){
            setIsRating(true)
        } else {
            if( !text ){
                callAlert(["Отзыв не должен быть пустым"], 'error', dispatch)
            }
            if( !isAuthenticated){
                callAlert(["Для того чтобы оставить коментарий вы должны войти в аккаунт"], 'error', dispatch)
            }
        }
    }

    return (
        <>
            <div className="productInfo">
                { isRating && (
                    <AddStarRating text={text} setIsRating={setIsRating}/>
                )}
                <Carousel className="modalSlider" itemsToShow={1}>
                    {product.shots.map(shot => (
                        <img src={shot.url} className="modalSliderItem" key={shot.id}/>
                    ))}
                </Carousel>
                <div className="modalLeft">
                    <div className="modalTitle">
                        <h3>{product.title}</h3>
                    </div>
                <div className="modalPrice">
                    <span>ЦЕНА:</span>
                    <b>{splitPrice(product.price)} руб.</b>
                </div>
                <div className="modalSize">
                    <span>РАЗМЕР:</span>
                    <div>
                        {product.size.map(size => (
                            <div className="sizeItem">
                                <input type="radio" id={"size" + size.id} name="size"/>
                                <label htmlFor={"size" + size.id}>{size.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <span>ЦВЕТ:</span>
                <div className="modalColor">
                {product.color.map(color => (
                    <div className="colorItem" key={color.id}>
                        <input type="radio" name="color" id={"color" +color.id}/>
                        <label htmlFor={"color" +color.id} style={{backgroundColor: color.color}}></label>
                    </div>
                ))}
                    
                
                </div>


                <div className='card-modal-btn-add'>
                    <button className="btn-success btn-add-basket" onClick={handleCheckboxAdd}>
                        Добавить в корзину
                    </button>
                    <span style={{opacity: (activeBasket ? 1 : 0)}}><i className="fa-solid fa-check"></i></span>
                </div>
                </div>
            </div>
            <h4>Описание</h4>
            <div className="description-modal ml-10">
                <p>{product.description}</p>
            </div>
            <h4>Отзывы</h4>
            <div className="reviews">
                <div className="d-flex mb-50">
                    <input type="text" onChange={(e) => setText(e.target.value)} />
                    <button className="btn-success btn-review" onClick={handleSubmit}>Оставить отзыв</button>
                </div>
                
                { product.review.map(el => (
                    <div className="reviewItem" key={el.id}>
                        <div className="d-flex">
                            <div className="user-photo">
                                <img src={el.user_photo === null ? "/static/Person.png": el.user_photo}/>
                            </div>
                            <div className="titleReview">
                                <b>{el.first_name}</b>
                                <div className="d-flex rating"><RatingStars stars={el.rating}/></div>
                                <div className="date-time">{el.date}</div>
                            </div>
                        </div>
                        <p>{el.text}</p>
            
                    </div>
                ))}
            </div>
        </>
    )
}

function AddStarRating(props){

    const values = ['5',"4","3","2","1"]
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    function handleRewiew(val){
        dispatch(leaveReview(props.text,val, state.products.detail.id, state.auth.token))
        props.setIsRating(false)
    }

    return(
        <div className="overlayStar">
            <div className="ratingForm">
                <h1>Оцените продукт</h1>
                <div>
                    {values.map(val => (
                        <>
                            <input type="radio" key={val} name="rating" id={"star"+val} className="ratingItem"onChange={() => handleRewiew(val)}/>
                            <label htmlFor={"star"+val}
                            
                            ><i className="fa-solid fa-star"></i></label>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default (props) => {
    
    const product = useSelector(state => state.products.detail)
    const loading = useSelector(state => state.products.isLoadingDetail)
    
    return (
        <>
        <div className={props.modal ? "modalContainer modalContainerActive" : "modalContainer"}>
        
            <div onClick={() => props.setModal(false)} className={props.modal ? "overlay overlayActive" : "overlay"}><button className='btn-close' onClick={() => props.setModal(false)}><i className="fa-solid fa-xmark"></i></button></div>
            <CSSTransition classNames="modal-anim" in={props.modal} timeout={400} unmountOnExit>
                <div className="modalCard">
    
                    {!loading && (
                        <DetailProduct />
                    )}
                    <CSSTransition classNames="loading-anim" in={loading} timeout={400} unmountOnExit>
                        <ModalLoading />
                    </CSSTransition>
                    
                </div>
            </CSSTransition>
            </div>
        </>
    )

}