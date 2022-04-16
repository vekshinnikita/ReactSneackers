import React, { useState, useEffect, useRef } from "react";
import Carousel from 'react-elastic-carousel'
import { CSSTransition } from 'react-transition-group'
import { IMaskInput } from "react-imask";
import { Input } from "@mui/material";
import PropTypes from "prop-types";

import Card from "./components/Card";
import ButtonsFilter from "./components/ButtonsFilter";
import SkeletonCard from "./components/Card/SkeletonCard"
import ProductModal from "./components/ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { firstUpdateAction, getFilterFields, getListProduct } from "../state/actions";
import useScroll from "../hooks/useScroll";
import ModalLoaging from './components/ProductModal/ModalLoading'


const PriceMask = React.forwardRef(function PriceMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="#000000"
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });
  
  PriceMask.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };



export default () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const pageQuantity = useSelector(state => state.products.pageQuantity)
    const loading = useSelector(state => state.products.isLoadingList)
    const firstUpdate = useSelector(state => state.components.firstUpdate)
    const [values, setValues] = useState({
        brand: [],
        sex: [],
        color: [],
        size: [],
        price_max: "",
        price_min: "",
        search: "",
        ordering: "",
    })
    const [page, setPage] = useState(2)
    const [modal, setModal] = useState(false)
    const [sort, setSort] = useState(0)
    const [filter, setFilter] = useState(false)
    const parentRef = useRef()
    const childRef = useRef()
    const intersected = useScroll(parentRef, childRef, () => handleScroll())
    
    const filterArr = [
        {
            name:'Цвет',
            type: 'color',
            list: []
        },
        {
            name:'Бренд',
            type: 'brand',
            list: ["NIKE","ADIDAS"]
        }, 
        {
            name:'Размер',
            type: 'size',
            list: ["NIKE","ADIDAS"]
        }, 
        {
            name:'Пол',
            type: 'sex',
            list: []
        }]

    useEffect(() => {
        if(firstUpdate){
            dispatch(getListProduct(false))
            dispatch(getFilterFields())
            dispatch(firstUpdateAction())
        }
    },[])

    useEffect(() => {
        if(!firstUpdate){
            dispatch(getListProduct(false, values))
        }
    },[values])

    function handleScroll() {
        if(pageQuantity >= page){
            dispatch(getListProduct(true, values, page))
            setPage(page+1)
        }
    }

    const handleChange = (event) => {
        if(event.target.checked){
            setValues({
                ...values,
                [event.target.name]: values[event.target.name].concat(event.target.value)
            });
        } else {
            setValues({
                ...values,
                [event.target.name]: values[event.target.name].filter(el => el !== event.target.value)
            })
        }
    };
    const handleInput = (event) => {
        setValues({
        ...values,
        [event.target.name]: event.target.value
        });
    };

    function handleSort(){
        switch (sort){

            case 1:
                setValues({
                    ...values,
                    ordering: "price",
                    });
                return setSort(2)
            default:
                setValues({
                    ...values,
                    ordering: "-price",
                    });
                return setSort(1)
        }
    }

    function getSort(){
        switch (sort){

            case 1:
                return (<i className="fa-solid fa-sort-up"></i>)
            case 2:
                return (<i className="fa-solid fa-sort-down"></i>)
            default:
                return (<i className="fa-solid fa-sort"></i>)
        }
    }

    return (
        <>

        <Carousel className="slider" itemsToShow={1}>
            <img  className="slider-item w100p" src={"/static/sliderItems1.jpg"} />
            <img  className="slider-item w100p" src={"/static/sliderItems1.jpg"}  />
        </Carousel>
        <div className="title-block d-flex justify-between">
            <h1>Все кроссовки</h1>
            <div className="d-flex justify-center">
            <div className="d-flex justify-end">
                <button className="button btn-filter" onClick={handleSort}>
                        { getSort() }
                    </button>
                <input 
                    type="checkbox" 
                    id='filter' 
                    className="checkbox-filter"
                    checked={filter}
                    onChange={() => setFilter(!filter)}/>
                <label 
                    htmlFor="filter" 
                    className="button btn-filter"
                    >
                        <i className="fa-solid fa-filter"></i>
                </label>
            </div>
            <div className="search-block d-flex alight-center">
                <i className="fa-solid fa-magnifying-glass"></i> 
                <input type="text" placeholder="Поиск..."  name="search" id="search" onChange={handleInput} value={values.search}/>
            </div> 
            
            </div> 
        </div>

        <CSSTransition classNames="filter-anim" in={filter} timeout={400} unmountOnExit>
            <div className="filter">
                <div className="d-flex flex-row flex-wrap">
                {filterArr.map( el => <ButtonsFilter key={el.name} name={el.name} handle={handleChange} type={el.type} list={el.list}/>)}
                </div>
                <div className="filter-price">
                    <div className="price-flex">
                        <div className="span-price">
                            От
                        </div>
                        <Input
                            value={values.price_min}
                            onChange={handleInput}
                            name="price_min"
                            id="price_min"
                            className="price-input"
                            inputComponent={PriceMask}
                        />
                    </div>
                    <div className="price-flex">
                        <div className="span-price">
                            До
                        </div>
                        <Input
                            value={values.price_max}
                            onChange={handleInput}
                            className="price-input"
                            name="price_max"
                            id="price_max"
                            inputComponent={PriceMask}
                        />
                    </div>
                </div>
            </div>
        </CSSTransition>

        <div className="product-row">
            <ProductModal  modal={modal} setModal={setModal} />
            {products.map((el) => <Card modal={modal} setModal={setModal} el={el} key={el.id} />)}
            <CSSTransition classNames="loading-anim" in={loading} timeout={400} unmountOnExit>
                <div className="skeleton-row">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </CSSTransition>
            <div ref={childRef} style={{position: "relative",height: "80px",width: "100%", }}>
                {pageQuantity >= page && (
                    <ModalLoaging/>
                )}
            </div>
        </div>
        </>

    )
}