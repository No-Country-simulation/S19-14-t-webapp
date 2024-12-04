import React, { useState } from 'react';
import styles from './PasswordForm.module.css';

const PasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    // Aquí normalmente harías una llamada a la API para actualizar la contraseña
    console.log('Password update submitted:', formData);
    
    // Resetear el formulario
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setError('');
  };

  return (
    <div className={styles.passwordForm}>
      <h1>Cambiar contraseña</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="currentPassword">Contraseña actual</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="newPassword">Nueva contraseña</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Repetir nueva contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitButton}>
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;