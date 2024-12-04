import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import PasswordForm from '../../components/PasswordForm/PasswordForm';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import RatingList from '../../components/RatingList/RatingList';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileForm />;
      case 'password':
        return <PasswordForm />;
      case 'favorites':
        return <FavoritesList />;
      case 'certificates':
        return <RatingList />;
      default:
        return <div>Sección en desarrollo</div>;
    }
  };

  return (
    <div className={styles.profilePage}>
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfilePage;