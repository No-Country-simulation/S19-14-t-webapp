import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers]= useState(null)
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Para manejar el estado de carga
  
   const fetchUsers = async () => {
    try {
      const response = await axios.get("https://oficiosya-api-production.up.railway.app/api/v1/users");
      
      setUsers(response.data); 
    } catch (error) {
      console.error("Error al obtener las usuarios:", error);
    }
  };
 
  useEffect(() => {
    fetchUsers();
   
  }, []);
   
  
    // Manejo de inicio de sesión
    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setIsLoggedIn(true); 
    };

    // Cargar usuario desde localStorage 
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsLoggedIn(true);
        }
        setIsLoading(false); // Marcar como cargado
    }, []);

    // Manejo de cierre de sesión
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setIsLoggedIn(false); 
    };
   
    

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, isLoggedIn, isLoading,users }}>
            {children}
        </UserContext.Provider>
    );
};
