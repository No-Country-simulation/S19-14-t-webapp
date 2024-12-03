import styles from '../styles/navbar.module.css'
import logo from '/images/logo.png'

export const Navbar = () => {
    return (
        <nav className={styles["navbar"]}>
            <div className={styles["navbar-nav"]}>
                <a href="#" className={styles["nav-logo"]}><img src={logo} alt="logo"/> OficiosYa</a>
                <ul className={styles["nav-items"]}>
                    <li><a href="#" className={styles["nav-link"]}>Profesionales</a></li>
                    <li><a href="#" className={styles["nav-link"]}>Sobre nosotros</a></li>
                    <li><a href="#" className={styles["nav-button"]}>Iniciar sesión / Registrarse</a></li>
                </ul>
            </div>
            {/* <div className="navbar-menuBtn"></div> */}
    </nav>
    )
}