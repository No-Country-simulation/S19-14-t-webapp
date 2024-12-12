import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../core/hooks/UserContext.jsx";
import "./WorkerProfile.css";
import Sidebar from "./Sidebar/Sidebar.jsx";

const UserProfile = () => {
  const { user, fetchUsers } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setError("No hay un usuario autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://oficiosya-api-production.up.railway.app/api/v1/users/${user.id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos del perfil");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      alert("No hay un usuario autenticado.");
      return;
    }

    try {
      const response = await fetch(
        `https://oficiosya-api-production.up.railway.app/api/v1/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        throw new Error("Error al guardar los datos del perfil");
      }
      alert("Perfil actualizado correctamente");
      fetchUsers();
    } catch (err) {
      alert("Error al actualizar el perfil: " + err.message);
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Sidebar />
      <section className="profile-form">
        <h2>Mi perfil</h2>
        <section>
          <img src={userData.profilePicture} alt="Foto de perfil" />
          <label>
            Cambiar foto de perfil
            <input
              type="file"
              onChange={(e) =>
                setUserData({ ...userData, profilePicture: e.target.files[0] })
              }
            />
          </label>
        </section>
        <section>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </section>
        <section>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </section>
        <section>
          <label>Ubicación</label>
          <input
            type="text"
            name="location"
            value={userData.location}
            onChange={(e) =>
              setUserData({ ...userData, location: e.target.value })
            }
          />
        </section>
        <section>
          <label>Biografía</label>
          <textarea
            name="biography"
            value={userData.biography}
            onChange={(e) =>
              setUserData({ ...userData, biography: e.target.value })
            }
          />
        </section>
        <button onClick={handleSave}>Guardar</button>
      </section>
    </>
  );
};

export default UserProfile;
