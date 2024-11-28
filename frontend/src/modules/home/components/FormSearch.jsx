import React from 'react';
import '@/index.css';
import styles from '../styles/formSearch.module.css';
import BtnBlue from '../../../core/components/BtnBlue';

export default function FormSearch() {
    return (
        <div className={styles["formSearch-container"]}>
            <input type="text" placeholder="Ingrese el servicio, ej: electricista" className={styles['formSearch-input']}/>
            <input type="text" placeholder="Ingrese su ubicación" className={styles['formSearch-input']}/>
            <BtnBlue text={'Buscar'}/>
        </div>
    );
}