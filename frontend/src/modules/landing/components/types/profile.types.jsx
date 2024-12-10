const userProfile = {
    id: "12345",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    password: "password123",
    location: "Ciudad, País",
    avatarUrl: null,
    profession: "Desarrollador",
    biography: "Apasionado por la tecnología y el desarrollo web."
  };
  
  const profileFormData = {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    password: "password123",
    location: "Ciudad, País",
    profession: "Desarrollador",
    biography: "Apasionado por la tecnología y el desarrollo web."
  };
  
  // Ejemplo de uso en un componente
  const UserProfileComponent = () => {
    return (
      <div>
        <h1>Perfil de Usuario</h1>
        <p>Nombre: {userProfile.name}</p>
        <p>Email: {userProfile.email}</p>
        <p>Ubicación: {userProfile.location}</p>
        <p>Profesión: {userProfile.profession}</p>
        <img src={userProfile.avatarUrl || 'default-avatar.png'} alt="Avatar" />
        <p>Biografía: {userProfile.biography}</p>
      </div>
    );
  };
  
  export default UserProfileComponent;