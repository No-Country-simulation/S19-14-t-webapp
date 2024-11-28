import styles from '../styles/offerService.module.css'

export const OfferService = () => {
    return (
        <section className={styles["ofrecer-servicio"]}>
            <h2 className={styles["ofrecer-servicio-title"]}>Si sos un profesional</h2>
            <a href="#" className={styles["ofrecer-servicio-btn"]}>Ofrecer un servicio</a>
        </section>
    )
}