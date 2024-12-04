import React from 'react';
import { UserCircle, Edit2 } from 'lucide-react';
import styles from './ProfileForm.module.css';

const ProfileForm = () => {
  return (
    <div className={styles.profileForm}>
      <h1>Mi perfil</h1>
      
      <div className={styles.avatarSection}>
        <div className={styles.avatarWrapper}>
          <UserCircle size={80} />
          <button className={styles.editButton}>
            <Edit2 size={16} />
          </button>
        </div>
        <p>Elige tu foto de perfil</p>
      </div>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="text"
            defaultValue="mirco Alvarez"
            className={styles.input}
          />
          <button className={styles.editField}>
            <Edit2 size={16} />
          </button>
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            defaultValue="mirco.A@hotmail.com"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            defaultValue="contraseña"
            className={styles.input}
          />
        </div>

        {/* <div className={styles.formGroup}>
          <input
            type="text"
            defaultValue="Oficio"
            className={styles.input}
          />
        </div> */}

        <div className={styles.formGroup}>
          <input
            type="text"
            defaultValue="Floresta, Buenos Aires"
            className={styles.input}
          />
        </div>

        {/* <div className={styles.formGroup}>
          <textarea
            placeholder="Biografia"
            className={styles.textarea}
          />
          <button className={styles.editField}>
            <Edit2 size={16} />
          </button>
        </div> */}

        <button type="submit" className={styles.submitButton}>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;