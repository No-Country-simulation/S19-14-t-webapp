import { useContext, useState } from "react";
import { UserContext } from "../../../../../core/hooks/UserContext.jsx";
import "./ChangePassword.css";

const ChangePassword = () => {
  const { user } = useContext(UserContext);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = async () => {
    if (!user) {
      alert("No hay un usuario autenticado.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://oficiosya-api-production.up.railway.app/api/v1/users/change-password/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al cambiar la contraseña.");
      }
      setSuccessMessage("Contraseña cambiada correctamente.");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="change-password">
      <h2>Cambiar Contraseña</h2>
      <section>
        <label>Contraseña Actual</label>
        <input
          type="password"
          value={passwordData.oldPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, oldPassword: e.target.value })
          }
        />
      </section>
      <section>
        <label>Contraseña Nueva</label>
        <input
          type="password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, newPassword: e.target.value })
          }
        />
      </section>
      <section>
        <label>Confirmar Contraseña Nueva</label>
        <input
          type="password"
          value={passwordData.confirmNewPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              confirmNewPassword: e.target.value,
            })
          }
        />
      </section>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <button onClick={handlePasswordChange} disabled={loading}>
        {loading ? "Cambiando..." : "Cambiar Contraseña"}
      </button>
    </section>
  );
};

export default ChangePassword;
