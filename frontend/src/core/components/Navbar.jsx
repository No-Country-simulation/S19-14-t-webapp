import styles from '../styles/navbar.module.css';
import logo from '/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import BtnBlue from './BtnBlue';
import BtnWhite from './BtnWhite';

export const Navbar = () => {
    const { user, handleLogout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleUserLogout = () => {
        handleLogout();
        navigate('/'); // Redirige al usuario después de cerrar sesión.
    };

    const handleProfileRedirect = () => {
        if (user?.role === 'CLIENT') {
            navigate('/profile'); // Redirige a la página de perfil si el usuario es cliente.
        }
    };

    return (
        <nav className={styles["navbar"]}>
            <div className={styles["navbar-nav"]}>
               
                <Link to={'/'} className={styles["nav-logo"]}> <img src={logo} alt="logo" /> OficiosYa</Link>   
                
                <ul className={styles["nav-items"]}>
                    <li><Link to={'/nosotros'} className={styles["nav-link"]}>Sobre Nosotros</Link></li>

                    {user ? (
                        <>
                            <li 
                                className={styles["nav-link"]} 
                                onClick={handleProfileRedirect}
                                style={{ cursor: 'pointer' }} // Hace que el texto sea clickeable.
                            >
                                Hola, {user.name}
                            </li>
                            <li>
                                <BtnBlue onClick={handleUserLogout} text={"Cerrar sesión"} />
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login"><BtnBlue text={'Iniciar sesión'} /></Link></li>
                            <li><Link to="/registro"><BtnWhite text={'Registrarse'} /></Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};
