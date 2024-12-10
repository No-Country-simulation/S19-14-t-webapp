import React, { useState } from 'react';

const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.src = url;

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.width,
        height: img.height,
      });
    };

    img.onerror = (error) => {
      URL.revokeObjectURL(url);
      reject(new Error('Error al cargar la imagen: ' + error.message));
    };
  });
};

const validateImageFile = async (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Formato de archivo no válido. Use: JPG, PNG, GIF o WebP',
    };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB en bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'La imagen no debe superar los 5MB',
    };
  }

  try {
    const dimensions = await getImageDimensions(file);
    if (dimensions.width > 2000 || dimensions.height > 2000) {
      return {
        isValid: false,
        error: 'La imagen es demasiado grande. Tamaño máximo recomendado: 2000x2000px',
      };
    }
  } catch (error) {
    console.error('Error al procesar la imagen:', error);
    return {
      isValid: false,
      error: 'Error al procesar la imagen: ' + error.message,
    };
  }

  return { isValid: true };
};

const ImageUpload = () => {
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const result = await validateImageFile(file);

      if (!result.isValid) {
        setError(result.error || 'Error desconocido');
        console.error("Error de validación:", result.error);
        setImageSrc(null); // Limpiar la miniatura si hay un error
      } else {
        setError(null);
        
        // Mostrar la miniatura de la imagen
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);

        console.log('Archivo válido:', file);
      }
    }
  };

  return (
    <div>
      <label htmlFor="image-upload">Sube tu imagen:</label>
      <input 
        id="image-upload" 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt="Vista previa de la imagen" 
          style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }} 
        />
      )}
    </div>
  );
};

export default ImageUpload;