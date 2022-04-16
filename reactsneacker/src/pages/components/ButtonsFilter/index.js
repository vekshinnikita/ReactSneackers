import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from './ButtonsFilter.module.scss'

export default (props) => {

    const [dropdown, setDropdown] = useState(false)
    const filterFields = useSelector(state => state.products.filterFields)


    return (
        <>
        { dropdown && (
            <div onClick={() => setDropdown(false)} className={styles.overlay}></div>
        )}
        


        <div className="pos-r m-10" >
            <input 
                className={styles.input} 
                type="checkbox"
                id={props.type}
                checked={dropdown} 
                onChange={() => setDropdown(!dropdown)}
            />
            <label className={styles.button} htmlFor={props.type} >
                <span>{props.name}</span>
                <i className="fa-solid fa-angle-down"></i>
            </label>
            

            <ul className={dropdown ? styles.dropdown + " " + styles.dropdownActive : styles.dropdown}>
                {filterFields[props.type].map(el =>(
                    <li className="d-flex" key={el.id}>
                        <input type="checkbox" id="btn-filter" name={props.type} value={el.name} onChange={props.handle}/>
                        <label htmlFor="btn-filter"><i className="fa-solid fa-check"></i></label>
                        <span>{el.name}</span>
                    </li>
                ))}
                
            </ul>
        </div>
        </>
    )
}