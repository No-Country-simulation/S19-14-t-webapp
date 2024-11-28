import styles from '../styles/searchService.module.css'

export const SearchService = () => {
    return (
        <section className={styles["buscar-servicio"]}>
            <h2 className={styles["buscar-servicio-title"]}>¿Cómo funciona?</h2>
            <a href="#" className={styles["buscar-servicio-btn"]}>Buscar un servicio</a>
        </section>
    )
}