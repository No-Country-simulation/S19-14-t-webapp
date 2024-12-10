import React, { useRef, useState } from 'react';
import { UserCircle, Edit2, X, Loader } from 'lucide-react';
import styles from './ImageUpload.module.css';

// Función para validar archivos de imagen
const validateImageFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (!allowedTypes.includes(file.type)) {
        return { isValid: false, error: 'Formato no permitido. Use JPG, PNG, GIF o WEBP.' };
    }

    if (file.size > maxSize) {
        return { isValid: false, error: 'El tamaño del archivo no debe superar los 5 MB.' };
    }

    return { isValid: true, error: null };
};

const ImageUpload = ({ onImageChange, initialImage }) => {
    const [preview, setPreview] = useState(initialImage || null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        console.log('Archivo seleccionado:', file);
        if (!file) return;

        try {
            setIsLoading(true);
            setError(null);

            const validationResult = validateImageFile(file);
            console.log('Validación:', validationResult);
            if (!validationResult.isValid) {
                setError(validationResult.error);
                setIsLoading(false);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('Archivo cargado correctamente.');
                setPreview(reader.result);
                setIsLoading(false);
            };
            reader.onerror = () => {
                console.error('Error al leer el archivo.');
                setError('Error al leer el archivo.');
                setIsLoading(false);
            };
            reader.readAsDataURL(file);

            onImageChange(file);
        } catch (err) {
            console.error('Error en handleFileChange:', err);
            setError('Error al procesar la imagen.');
            setIsLoading(false);
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        setPreview(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onImageChange(null);
    };

    return (
        <div className={styles.container}>
            <div 
                className={styles.uploadArea} 
                onClick={handleClick}
                role="button"
                tabIndex={0}
            >
                {isLoading ? (
                    <div className={styles.loadingContainer}>
                        <Loader className={styles.spinner} size={24} />
                    </div>
                ) : preview ? (
                    <div className={styles.imageContainer}>
                        <img 
                            src={preview} 
                            alt="Preview" 
                            className={styles.preview}
                        />
                        <button 
                            className={styles.removeButton}
                            onClick={handleRemove}
                            title="Eliminar imagen"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        <UserCircle size={80} />
                        <button className={styles.editButton}>
                            <Edit2 size={16} />
                        </button>
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.webp"
                onChange={handleFileChange}
                className={styles.input}
            />

            {error && (
                <div className={styles.error}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
