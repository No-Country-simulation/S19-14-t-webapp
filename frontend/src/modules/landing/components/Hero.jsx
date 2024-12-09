import styles from '../styles/hero.module.css'

export const Hero = () => {
    return (
        <section className={styles["hero"]}>
            <div className={styles["hero-content"]}>
                <h1 className={styles["hero-title"]}>Nosotros</h1>
                <p className={styles["hero-text"]}><b>OficiosYa</b> facilita la conexión entre clientes y profesionales de confianza en servicios como electricidad, plomería, jardinería, etc. Nuestra plataforma te permite encontrar expertos calificados, revisar su experiencia y contactarlos directamente para el servicio que necesitas. Cada profesional ha sido verificado, asegurando rapidez y seguridad en cada proyecto. ¡Simplifica tus búsquedas con OficiosYa!</p>
            </div>
            <div className={styles["hero-buttons"]}>
                <a href="/" className={styles["hero-btn"]}>Buscar un servicio</a>
                <a href="/registro" className={styles["hero-btn"]}>Ofrecer un servicio</a>
            </div>
        </section>
    )
}