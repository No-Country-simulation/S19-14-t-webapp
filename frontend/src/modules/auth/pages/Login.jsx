import styles from '../styles/login.module.css';
import logo from "../../../../public/images/logo.png";
import BtnBlue from '../../../core/components/BtnBlue';
import BtnWhite from '../../../core/components/BtnWhite';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../../core/hooks/UserContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { handleLogin } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const notificacionRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!email || !password) {
            notificacionRef.current.style.color = "red";
            notificacionRef.current.innerHTML = "Por favor, complete todos los campos.";
            return;
        }

        const requestBody = { email, password };

        try {
            const response = await fetch("https://oficiosya-api-production.up.railway.app/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log("data login", data);

            if (!response.ok) {
                // Muestra el mensaje de error del servidor
                notificacionRef.current.style.color = "red";
                notificacionRef.current.innerHTML = "Error al iniciar sesión.";
                return;
            }

            handleLogin(data);

            // Redirige según el rol del usuario
            if (data.role === "CLIENT") {
                navigate("/");
            } else if (data.role === "SERVICE") {
                navigate("/perfil-Servicio");
            } else {
                notificacionRef.current.style.color = "red";
                notificacionRef.current.innerHTML = "Rol no reconocido.";
            }
        } catch (error) {
            // Manejar errores de red
            console.error("Error de red:", error);
            notificacionRef.current.style.color = "red";
            notificacionRef.current.innerHTML = "Error de conexión. Intente nuevamente.";
        }
    };

    return (
        <div className={styles.container_general_login}>
            <div className={styles.container_logo_titulo_login}>
                <div>
                    <img src={logo} alt="logo" className={styles.logo} />
                </div>
                <div className={styles.container_oficiosYa_bienvenido_login}>
                    <h1 className={styles.oficiosYa}>OficiosYa</h1>
                    <p className={styles.bienvenido}>BIENVENIDO!</p>
                </div>
            </div>

            <div className={styles.container_form_login}>
                <form className={styles.form_login} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p style={{ textDecoration: "underline" }}>¿Has olvidado la contraseña?</p>

                    <p id="notificacion" ref={notificacionRef}></p>

                    <BtnBlue text="Iniciar sesión" />
                    <BtnWhite 
                        text="Registrarse" 
                        onClick={() => navigate("/registro")} 
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;
