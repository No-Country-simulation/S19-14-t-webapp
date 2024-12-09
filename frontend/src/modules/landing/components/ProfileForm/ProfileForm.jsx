import React, { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';
import ImageUpload from '../ImageUpload/ImageUpload';
import { getProfile, updateProfile } from '../../utils/profileStorage';
import styles from './ProfileForm.module.css';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    profession: '',
    biography: ''
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
        email: profile.email,
        password: profile.password,
        location: profile.location,
        profession: profile.profession,
        biography: profile.biography
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
      await updateProfile(formData, imageFile);
      setSaveMessage('Perfil actualizado correctamente');
      
      // Actualizar la imagen guardada si se subió una nueva
      if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSavedImage(reader.result);
        };
        reader.readAsDataURL(imageFile);
      }
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
            placeholder="Nombre completo"
            required
          />
          <button type="button" className={styles.editField}>
            <Edit2 size={16} />
          </button>
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="Email"
            required
          />
        </div>
{/* 
        <div className={styles.formGroup}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            placeholder="Contraseña"
            required
          />
        </div> */}

        <div className={styles.formGroup}>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className={styles.input}
            placeholder="Profesión"
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
            required
          />
        </div>

        {/* <div className={styles.formGroup}>
          <textarea
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Biografía"
          />
          <button type="button" className={styles.editField}>
            <Edit2 size={16} />
          </button>
        </div> */}

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