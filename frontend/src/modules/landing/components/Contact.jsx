import { FormBlock } from "../../../core/components/FormBlock"
import styles from "../styles/contact.module.css"
import "boxicons"

export const Contacto = () => {
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <section className={styles["contacto"]}>
            <h2 className={styles["contacto-title"]}>Hacé tu consulta</h2>
            <div className={styles["contacto-content"]}>
                <form className={styles["contacto-form"]} onSubmit={handleSubmit}>
                    <FormBlock labelFor="name" labelTitle="Nombre y Apellido" inputType="text" />
                    <FormBlock labelFor="email" labelTitle="E-mail" inputType="email" />
                    <FormBlock labelFor="tel" labelTitle="Teléfono" inputType="number" />
                    <FormBlock labelFor="msg" labelTitle="Mensaje" inputType="text" />
                    <button type="submit" className={styles["form-btn"]}>Enviar</button>
                </form>
                <div className={styles["contacto-info"]}>
                    <p className="info-text">IMPORTANTE: Para asesorarte mejor, te sugerimos que no olvides incluir las medidas del espacio a cotizar indicando ancho, alto y profundidad. También, podés agregar fotos para ilustrar mejor tu consulta.</p>
                    <span className={styles["info"]}><box-icon name='envelope' color="#A7D6EF" />oficiosya@atencion.com.ar</span>
                    <span className={styles["info"]}><box-icon name="phone" color="#A7D6EF" />11227 48608</span>
                    <span className={styles["info"]}><box-icon name="time" color="#A7D6EF" />Lunes a viernes de 8 a 17 hs. | Sábados de 8 a 13 hs.</span>
                </div>
            </div>
        </section>
    )
}