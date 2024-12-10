import { useState } from 'react';
import '../styles/home.css';
import FormSearch from '../components/FormSearch';
import CardFilter from '../components/CardFilter';
import BtnBlue from '../../../core/components/BtnBlue';


export default function Home() {
    const [showMore, setShowMore] = useState(false);

    const filters = [
        {category: 'Electricista', image: '/images/categorias/electricista.png'},
        {category: 'Jardinero', image: '/images/categorias/jardinero.png'},
        {category: 'Pintor', image: '/images/categorias/pintor.png'},
        {category: 'Plomero', image: '/images/categorias/plomero.png'},
        {category: 'Mecánico', image: '/images/categorias/mecanico.png'},
        {category: 'Reparador', image: '/images/categorias/reparador.png'},
        {category: 'Vidriero', image: '/images/categorias/vidriero.png'},
        {category: 'Gasista y caleffación', image: '/images/categorias/gasista.png'},
        {category: 'Albañil', image: '/images/categorias/albanil.png'},
        {category: 'Cerrajero', image: '/images/categorias/cerrajero.png'},
        {category: 'Técnico Refrigeración', image: '/images/categorias/refrigeracion.png'},
        {category: 'Carpintero', image: '/images/categorias/carpintero.png'},
        {category: 'Decoración', image: '/images/categorias/decoracion.png'},
        {category: 'Fumigador', image: '/images/categorias/fumigador.png'},
        {category: 'Limpieza', image: '/images/categorias/limpieza.png'},
    ];

    const toggleShowMore = () => setShowMore(!showMore);

    const visibleFilters = showMore ? filters : filters.slice(0, 5);
   
   

    return (
        <div>
            {/* ---------- Header */}
            <div className='header-image-container'>
                <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
                    <p style={{textAlign: 'center', fontSize: 20, marginBottom: 20}}>“Encuentra al profesional adecuado para cada tarea en un solo clic”</p>
                    <FormSearch/>
                </div>
            </div>

            {/* ---------- Cards Filter */}
            <p style={{textAlign: 'center', paddingTop: 40, fontSize: 28, fontWeight: 600}}>Servicios</p>
            <div className='card-container'>
                {visibleFilters.map(filter => (
                    <CardFilter
                        key={filter.category}
                        filter={filter}
                    />
                ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', paddingBottom: 50}}>
                <BtnBlue text={showMore ? 'Ver menos' : 'Ver más'} onPress={toggleShowMore}/>
            </div>
        </div>
    );
}
