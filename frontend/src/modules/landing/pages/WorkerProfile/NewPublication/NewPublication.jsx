/* eslint-disable no-unused-vars */
/* import { useState, useContext } from "react";
import { UserContext } from "../../../../../core/hooks/UserContext";
import "./NewPublication.css";

const NewPublication = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  const [publicationData, setPublicationData] = useState({
    title: "",
    description: "",
    date: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublicationData({ ...publicationData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setPublicationData((prevData) => ({
      ...prevData,
      images: [prevData.images, files],
    }));
  };

  const handleSave = () => {
    fetch(
      `https://oficiosya-api-production.up.railway.app/api/v1/portfolios/${user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(publicationData),
      }
    )
      .then((response) => response.json())
      // eslint-disable-next-line no-unused-vars
      .then((data) => alert("Publicación guardada con éxito"))
      .catch((error) =>
        console.error("Error al guardar la publicación:", error)
      );
    console.log("data", publicationData);
  };

  return (
    <section className="new-publication-container">
      <h2>Crear Publicación</h2>
      <section>
        <input
          type="text"
          name="title"
          value={publicationData.title}
          onChange={handleChange}
          placeholder="Título trabajo"
        />
      </section>

      <section>
        <label>Descripción</label>
        <textarea
          name="description"
          value={publicationData.description}
          onChange={handleChange}
        />
      </section>
      <section className="image-upload-section">
        <input
          type="file"
          multiple
          accept="image/*"
          name="file"
          id="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="file">Cargar fotografías</label>
      </section>
      <button onClick={handleSave}>Guardar</button>
    </section>
  );
};

export default NewPublication;
 */

import { useState, useContext } from "react";
import { UserContext } from "../../../../../core/hooks/UserContext";
import "./NewPublication.css";
import axios from "axios";

const NewPublication = () => {
  const { user } = useContext(UserContext);
  const [publicationData, setPublicationData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
    image_id: null,
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublicationData({ ...publicationData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log("image", image);
  };

  const handleSave = async () => {
    try {
      // Cargar la imagen en Cloudinary
      const formData = new FormData();

      formData.append("file", image);
      console.log("formdata", formData);
      try {
        const imageResponse = await axios.post(
          `https://oficiosya-api-production.up.railway.app/api/v1/images/portfolios/${user.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        console.log("Image response:", imageResponse.data);

        // Actualizar el estado con el image_id
        setPublicationData({
          ...publicationData,
          image_id: imageResponse.data.publicId,
        });

        // Guardar la publicación con el ID de la imagen
        const publicationResponse = await fetch(
          `https://oficiosya-api-production.up.railway.app/api/v1/portfolios/${user.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(publicationData),
          }
        );

        if (publicationResponse.ok) {
          alert("Publicación guardada con éxito");
        } else {
          const errorData = await publicationResponse.json();
          console.error("Error al guardar la publicación:", errorData);
        }
      } catch (error) {
        console.error("Error al cargar la imagen:", error.response.data);
        throw error;
      }
    } catch (error) {
      console.error("Error al guardar la publicación:", error);
    }
  };

  return (
    <section className="new-publication-container">
      <h2>Crear Publicación</h2>
      <section>
        <input
          type="text"
          name="title"
          value={publicationData.title}
          onChange={handleChange}
          placeholder="Título trabajo"
        />
      </section>
      <section>
        <label>Descripción</label>
        <textarea
          name="description"
          value={publicationData.description}
          onChange={handleChange}
        />
      </section>
      <section className="image-upload-section">
        <input
          type="file"
          accept="image/*"
          name="file"
          id="file"
          onChange={handleImageChange}
        />
        <label htmlFor="file">Cargar fotografía</label>
      </section>
      <button onClick={handleSave}>Guardar</button>
    </section>
  );
};

export default NewPublication;
