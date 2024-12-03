import { GuideCard } from './GuideCard'
import styles from '../styles/searchService.module.css'

export const SearchService = () => {
    return (
        <section className={styles["buscar-servicio"]}>
            <h2 className={styles["buscar-servicio-title"]}>¿Cómo funciona?</h2>
            <div className={styles["buscar-servicio-cards"]}>
            <GuideCard number={1} image="onboarding-card-1.png" tag="Buscá el servicio" description="Ingresá tu ubicación y el tipo de servicio que necesitás, ej. electricidad, plomería, etc. Te mostraremos los mejores profesionales cerca tuyo!" />
            <GuideCard number={2} image="onboarding-card-2.png" tag="Revisá y seleccioná" description="Explorá los perfiles, revisá la experiencia de cada profesional y elegí lo que mejor se adapte a tu necesidad." />
            <GuideCard number={3} image="onboarding-card-3.png" tag="Registrate" description="Para contactar profesionales solo necesitas crear una cuenta. ¡Así garantizamos la seguridad de cada conexión!" />
            <GuideCard number={4} image="onboarding-card-4.png" tag="Confirmá el servicio" description="Iniciá un chat directo con el profesional seleccionado para coordinar una visita." />
            </div>
            <a href="#" className={styles["buscar-servicio-btn"]}>Buscar un servicio</a>
        </section>
    )
}