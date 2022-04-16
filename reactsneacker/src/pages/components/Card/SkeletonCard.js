import React from 'react';
import styles from './Card.module.scss'

export default () => {


    return (
        <div className={styles.cardSkeleton + " " + styles.card }>
            <div className={styles.blockImg}><div></div></div>
            <div className={styles.blockText1}></div>
            <div className={styles.blockText2}></div>
            <div className='d-flex justify-between align-end flex mt-25'>
                <div className={styles.blockPrice}></div>
                <div className={styles.blockBtn}></div>
            </div>
        </div>
    )
}