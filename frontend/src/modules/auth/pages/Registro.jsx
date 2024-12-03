import React, { useState } from "react";
import axios from "axios";
import logo from "../../../../public/images/logo.png";
import styles from "../styles/registro.module.css";
import BtnBlue from "../../../core/components/BtnBlue";

function Registro() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [newUser, setNewUser] = useState({
        role: "",
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmarPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!newUser.name || !newUser.lastName || !newUser.email || !newUser.password || !newUser.role) {
            setErrorMessage("Por favor, completa todos los campos.");
            return;
        }

        if (newUser.password !== newUser.confirmarPassword) {
            setErrorMessage("Las contraseñas no coinciden.");
            return;
        }

        const { confirmarPassword, ...userToSend } = newUser;

        setLoading(true);

        try {
            const response = await axios.post(
                "https://oficiosya-api-production.up.railway.app/api/v1/users",
                userToSend
            );

            alert("Registro exitoso");
            setNewUser({
                role: "",
                name: "",
                lastName: "",
                email: "",
                password: "",
                confirmarPassword: "",
            });
        } catch (error) {
            setErrorMessage(
                "Hubo un error en el registro. " +
                (error.response?.data?.message || "Intenta de nuevo más tarde.")
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container_general_registro}>
            <div className={styles.container_logo_titulo_registro}>
                <div>
                    <img src={logo} alt="logo" />
                </div>
                <div>
                    <h1>OficiosYa</h1>
                    <p className={styles.bienvenido}>BIENVENIDO!</p>
                </div>
            </div>

            <div className={styles.container_form_registro}>
                <form className={styles.form_registro} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nombre"
                        onChange={handleChange}
                        value={newUser.name}
                    />
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Apellido"
                        onChange={handleChange}
                        value={newUser.lastName}
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={newUser.email}
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        value={newUser.password}
                    />
                    <input
                        type="password"
                        id="confirmarPassword"
                        name="confirmarPassword"
                        placeholder="Repetir contraseña"
                        onChange={handleChange}
                        value={newUser.confirmarPassword}
                    />
                    <select name="role" id="role" onChange={handleChange} value={newUser.role}>
                        <option value="" disabled>
                            Selecciona tu Rol
                        </option>
                        <option value="CLIENT">Cliente</option>
                        <option value="SERVICE">Trabajador</option>
                    </select>

                    {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}

                    <BtnBlue text={loading ? "Registrando..." : "Registrarse"} />
                </form>


            </div>
            <div className={styles.container_yaTienesUsuario}>
                <p>¿Ya tienes un usuario?</p>
                <p style={{ textDecoration: "underline" }}>Iniciar sesión</p>
            </div>
        </div>
    );
}

export default Registro;
