import styles from '../styles/btnBlue.module.css';

export default function BtnBlue({text, onPress}) {
    return (
        <button onClick={onPress} className={styles.button}>
            {text}
        </button>
    )
}