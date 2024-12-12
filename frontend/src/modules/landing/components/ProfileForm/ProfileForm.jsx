import React, { useState, useEffect, useContext } from 'react';
import { Edit2 } from 'lucide-react';
import ImageUpload from '../ImageUpload/ImageUpload';
import { getProfile, updateProfile } from '../../utils/profileStorage';
import styles from './ProfileForm.module.css';
import axios from 'axios';
import { UserContext } from '../../../../core/hooks/UserContext';

const API_BASE_URL = 'https://oficiosya-api-production.up.railway.app/api/v1';

const ProfileForm = () => {
  const { user } = useContext(UserContext);
  console.log("user", user);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    location: '',
    linkedin: '',
    social_media: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [savedImage, setSavedImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const profile = getProfile();
    if (profile) {
      setFormData({
        name: profile.name,
        lastName: profile.lastName,
        email: profile.email,
        location: profile.location,
        linkedin: profile.linkedin,
        social_media: profile.social_media
      });
      setSavedImage(profile.avatarUrl);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
  
    try {
      // Normalizar los datos: convertir cadenas vacías en null
      const normalizedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value === '' || value === undefined ? null : value])
      );
  
  
      console.log("userId", user.id);
      console.log("datos normalizados", normalizedData);
  
      // Actualización del perfil
      await axios.patch(`${API_BASE_URL}/users/${user.id}`, normalizedData);
  
      // Subida de la imagen
      if (imageFile) {
        const formDataForImage = new FormData();
        formDataForImage.append('file', imageFile);
  
        await axios.post(`${API_BASE_URL}/images/users/${user.id}`, formDataForImage, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Imagen subida correctamente');
      }
  
      setSaveMessage('Perfil actualizado correctamente');
    } catch (error) {
      setSaveMessage('Error al guardar los cambios');
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };
  

  return (
    <div className={styles.profileForm}>
      <h1>Mi perfil</h1>

      <div className={styles.avatarSection}>
        <ImageUpload 
          onImageChange={handleImageChange}
          initialImage={savedImage}
        />
        <p>Elige tu foto de perfil</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Nombre"
          />
          <button type="button" className={styles.editField}>
            <Edit2 size={16} />
          </button>
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={styles.input}
            placeholder="Apellido"
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="Email"
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className={styles.input}
            placeholder="LinkedIn"
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="social_media"
            value={formData.social_media}
            onChange={handleChange}
            className={styles.input}
            placeholder="Facebook"
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={styles.input}
            placeholder="Ubicación"
          />
        </div>

        {saveMessage && (
          <div className={`${styles.message} ${saveMessage.includes('Error') ? styles.error : styles.success}`}>
            {saveMessage}
          </div>
        )}

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSaving}
        >
          {isSaving ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
