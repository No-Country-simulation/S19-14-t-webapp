import { Link } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <aside className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <section className="sidebar-header">
        <button onClick={toggleSidebar} className="collapse-button">
          {isSidebarCollapsed ? ">" : "<"}
        </button>
        <h2 className={`sidebar-title ${isSidebarCollapsed ? "hidden" : ""}`}>
          Hola José!
        </h2>
      </section>
      <nav>
        <ul>
          <li>
            <Link to="/perfil-Servicio" className="link">
              Mi perfil
            </Link>
          </li>
          <li>
            <Link to="/new-publication" className="link">
              Nueva Publicación
            </Link>
          </li>
          <li>
            <Link to="../ChangePassword/ChangePassword.jsx" className="link">
              Cambiar Contraseña
            </Link>
          </li>
          <li>
            <Link to="/my-works" className="link">
              Mis Trabajos
            </Link>
          </li>
          <li>
            <Link to="../WorkerCertificates/Certificates.jsx" className="link">
              Certificados
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
