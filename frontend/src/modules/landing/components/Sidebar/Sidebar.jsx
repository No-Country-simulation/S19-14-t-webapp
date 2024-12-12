import React from 'react';
import { ChevronLeft } from 'lucide-react';
import styles from './Sidebar.module.css';
import { useContext } from 'react';
import { UserContext } from "../../../../core/hooks/UserContext";


const menuItems = [
  { id: 'profile', label: 'Mi perfil' },
  { id: 'password', label: 'Cambiar contraseña' },
  { id: 'favorites', label: 'Mis favoritos' },
  { id: 'certificates', label: 'Calificar' },
];

const Sidebar = ({ activeSection, onSectionChange }) => {
  const {user}= useContext(UserContext)
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <ChevronLeft size={24} />
        <h2>{user.name}</h2>
      </div>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.menuItem} ${activeSection === item.id ? styles.active : ''}`}
            onClick={() => onSectionChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;