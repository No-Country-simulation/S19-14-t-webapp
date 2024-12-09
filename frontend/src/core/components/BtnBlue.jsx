import styles from '../styles/btnBlue.module.css';

export default function BtnBlue({text}) {
    const handlePress = () => {
        console.log('Clic')
    }
    return (
        <button onClick={handlePress} className={styles.button}>
            {text}
        </button>
    )
}