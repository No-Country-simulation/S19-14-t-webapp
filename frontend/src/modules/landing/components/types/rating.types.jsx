const providers = [
    {
      id: 1,
      name: "Juan Pérez",
      profession: "Plomero",
      totalRating: 100,
      ratingCount: 10,
      averageRating: 10,
    },
    {
      id: 2,
      name: "María González",
      profession: "Electricista",
      totalRating: 80,
      ratingCount: 8,
      averageRating: 10,
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      profession: "Pintor",
      totalRating: 90,
      ratingCount: 9,
      averageRating: 10,
    },
  ];
  
  const ratings = [
    {
      id: 1,
      providerId: 1,
      rating: 10,
      comment: "Excelente trabajo.",
      date: "2024-03-15",
      userName: "Usuario1",
    },
    {
      id: 2,
      providerId: 2,
      rating: 8,
      comment: "Buen servicio, pero con retraso.",
      date: "2024-03-12",
      userName: "Usuario2",
    },
  ];
  
  const ratingHistory = [
    {
      id: 1,
      providerId: 1,
      previousRating: 8,
      newRating: 10,
      date: "2024-03-15",
      action: "update",
    },
  ];
  
  // Ejemplo de uso en un componente
  const RatingsComponent = () => {
    return (
      <div>
        <h1>Proveedores y Calificaciones</h1>
        <h2>Proveedores</h2>
        <ul>
          {providers.map((provider) => (
            <li key={provider.id}>
              {provider.name} - {provider.profession} - Calificación promedio: {provider.averageRating}
            </li>
          ))}
        </ul>
  
        <h2>Calificaciones</h2>
        <ul>
          {ratings.map((rating) => (
            <li key={rating.id}>
              {rating.userName} calificó a {rating.providerId} con {rating.rating} - "{rating.comment}" el {rating.date}
            </li>
          ))}
        </ul>
  
        <h2>Historial de Calificaciones</h2>
        <ul>
          {ratingHistory.map((history) => (
            <li key={history.id}>
              Proveedor ID {history.providerId} cambió de calificación de {history.previousRating} a {history.newRating} el {history.date} (Acción: {history.action})
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RatingsComponent;