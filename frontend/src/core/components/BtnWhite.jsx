import React from 'react';
import styles from '../styles/btnWhite.module.css';

export default function BtnWhite({ text, onClick }) {
    return (
        <button type="button" onClick={onClick} className={styles.button}>
            {text}
        </button>
    );
}
