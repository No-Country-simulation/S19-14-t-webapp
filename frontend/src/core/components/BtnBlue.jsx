import React from 'react'
import styles from '../styles/btnBlue.module.css';

export default function BtnBlue({ text, onClick }) {
    return (
        <button onClick={onClick} className={styles.button}>
            {text}
        </button>
    );
}
