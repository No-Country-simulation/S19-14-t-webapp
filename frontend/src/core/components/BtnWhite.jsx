import React from 'react'
import styles from '../styles/btnWhite.module.css';

export default function BtnWhite({text}) {
    const handlePress = () => {
        console.log('Clic')
    }
    return (
        <button onClick={handlePress} className={styles.button}>
            {text}
        </button>
    )
}