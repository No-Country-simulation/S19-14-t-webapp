const STORAGE_KEY = 'user_profile';

export const saveProfile = (profile) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};

export const getProfile = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const saveProfileImage = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };
    
    reader.readAsDataURL(imageFile);
  });
};

export const updateProfile = async (formData, imageFile = null) => {
  const currentProfile = getProfile();
  let avatarUrl = currentProfile?.avatarUrl || null;

  if (imageFile) {
    try {
      avatarUrl = await saveProfileImage(imageFile);
    } catch (error) {
      console.error('Error saving profile image:', error);
    }
  }

  const updatedProfile = {
    id: currentProfile?.id || crypto.randomUUID(),
    ...formData,
    avatarUrl
  };

  saveProfile(updatedProfile);
  return updatedProfile;
};