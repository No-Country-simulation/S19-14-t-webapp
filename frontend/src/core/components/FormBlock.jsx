import styles from '../styles/formBlock.module.css'

export const FormBlock = ({labelFor, labelTitle, inputType}) => {
    return (
        <div className={styles["form-block"]}>
            <label htmlFor={labelFor} className={styles["form-label"]}>{labelTitle}</label>
            <input type={inputType} id={labelFor} className={styles["form-input"]} autoComplete="off" />
            <p className={styles["form-errorText"]}>Este campo es necesario</p>
        </div>
    )
}