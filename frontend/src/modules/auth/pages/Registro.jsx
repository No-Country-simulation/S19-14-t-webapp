import React, { useState } from "react";
import axios from "axios";
import logo from "../../../../public/images/logo.png";
import styles from "../styles/registro.module.css";

function Registro() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [newUser, setNewUser] = useState({
        role: "CLIENT",
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

        if (newUser.password !== newUser.confirmarPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const userToSend = {
            name: newUser.name,
            lastName: newUser.lastName,
            email: newUser.email,
            password: newUser.password,
            role: newUser.role,
        };

        console.log("Usuario nuevo", userToSend);

        setLoading(true);

        try {
            const response = await axios.post(
                "https://oficiosya-api-production.up.railway.app/api/v1/users",
                userToSend
            );

            console.log(response.data);
            alert("Registro exitoso");
            setNewUser({
                role: "CLIENT",
                name: "",
                lastName: "",
                email: "",
                password: "",
                confirmarPassword: "",
            });
        } catch (error) {
            console.log(error);
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
                        <option value="CLIENT">Cliente</option>
                        <option value="WORKER">Trabajador</option>
                    </select>
                    <button className={styles.btn_registrarse} disabled={loading}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>
                {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
            </div>

            <div
                className={styles.container_yaTienesUsuario}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 50 }}
            >
                <p>¿Ya tienes un usuario?</p>
                <p style={{ textDecoration: "underline" }}>Iniciar sesión</p>
            </div>
        </div>
    );
}

export default Registro;
