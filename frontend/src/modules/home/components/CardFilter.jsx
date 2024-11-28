import React from 'react'
import styles from '../styles/cardFilter.module.css'


export default function CardFilter({filter}) {
    const {category, image } = filter
    const handleClic = () => {
        console.log('Filtrado por categoría')
    }
    return (
        <button onClick={handleClic} className={styles['container']}>
            <div className={styles['image-container']}>
                <img src={image} alt="image Category" className={styles['image']}/>
            </div>
            <div className={styles['text-container']}>
                <p className={styles['text']}>{category}</p>
            </div>
        </button>
    )
}