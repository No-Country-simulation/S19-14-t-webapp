import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../core/hooks/UserContext.jsx";
import "./MyWorks.css";

const MyWorks = () => {
  const { user } = useContext(UserContext); // Obtenemos datos del usuario desde el contexto
  const [portfolios, setPortfolios] = useState([]);
  const [portfolioData, setPortfolioData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los portfolios (trabajos realizados) del trabajador
  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!user) {
        setError("No hay un usuario autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://oficiosya-api-production.up.railway.app/api/v1/portfolios/all/${user.id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los portfolios.");
        }
        const data = await response.json();
        setPortfolios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [user]);

  const handleSavePortfolio = async (portfolioId) => {
    if (!user) {
      alert("No hay un usuario autenticado.");
      return;
    }

    try {
      const response = await fetch(
        `https://oficiosya-api-production.up.railway.app/api/v1/portfolios/${portfolioId}`,
        {
          method: "PATCH", // Usamos PATCH para actualizar el portfolio
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(portfolioData),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el portfolio.");
      }
      alert("Portfolio actualizado correctamente");
    } catch (err) {
      alert("Error al actualizar el portfolio: " + err.message);
    }
  };

  if (loading) return <p>Cargando portfolios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="portfolios">
      <h2>Trabajos Realizados</h2>
      {portfolios.map((portfolio) => (
        <div key={portfolio.id}>
          <p>{portfolio.name}</p>
          <p>{portfolio.image_id}</p>
          <textarea
            value={
              portfolioData[portfolio.id]?.description || portfolio.description
            }
            onChange={(e) =>
              setPortfolioData({
                ...portfolioData,
                [portfolio.id]: {
                  ...portfolioData[portfolio.id],
                  description: e.target.value,
                },
              })
            }
          />
          <button onClick={() => handleSavePortfolio(portfolio.id)}>
            Guardar Trabajo
          </button>
        </div>
      ))}
    </section>
  );
};

export default MyWorks;
