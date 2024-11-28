import { GuideCard } from './GuideCard'
import styles from '../styles/offerService.module.css'

export const OfferService = () => {
    return (
        <section className={styles["ofrecer-servicio"]}>
            <h2 className={styles["ofrecer-servicio-title"]}>Si sos un profesional</h2>
            <div className={styles["ofrecer-servicio-cards"]}>
                <GuideCard number={1} image="onboarding-card-5.png" tag="Registrate en la plataforma" description="Creá tu perfil profesional con experiencia, agregá fotos de tus trabajos anteriores para destacar tu habilidad." />
                <GuideCard number={2} image="onboarding-card-6.png" tag="Configurá tus servicios" description="Definí qué servicios ofreces, dónde trabajás y tu disponibilidad, así los clientes adecuados te encontrarán fácilmente." />
                <GuideCard number={3} image="onboarding-card-7.png" tag="Recibí solicitudes de clientes" description="Los clientes interesados podrán ver tu perfil y ponerse en contacto con vos para coordinar una entrevista." />
                <GuideCard number={4} image="onboarding-card-8.png" tag="Expandí tus servicios" description="Respondé a los clientes, completá proyectos y recibí reseñas que fortalecerán tu perfil, atrayendo más clientes en el futuro." />
                
            </div>
            <a href="#" className={styles["ofrecer-servicio-btn"]}>Ofrecer un servicio</a>
        </section>
    )
}