import imageHeader from '../../../../public/images/header.jpg'
import userImage from '../../../../public/images/userImage.jpg'
import logo from '../../../../public/images/logo.png'
import iconElectricista from '../../../../public/images/icon-electricista.png'
import iconPlomero from '../../../../public/images/icon-plomero.png'
import iconJardinero from '../../../../public/images/icon-jardinero.png'
import iconPintor from '../../../../public/images/icon-pintor.png'
import iconCarpintero from '../../../../public/images/icon-carpintero.png'
import '../styles/home.css'
import FormSearch from '../components/FormSearch'
import CardFilter from '../components/CardFilter'
import BtnBlue from '../../../core/components/BtnBlue'


export default function Home() {
    const filters = [
        {category: 'Electricista', image: iconElectricista},
        {category: 'Plomero', image: iconPlomero},
        {category: 'Jardinero', image: iconJardinero},
        {category: 'Pintor', image: iconPintor},
        {category: 'Carpintero', image: iconCarpintero},
    ]

    return (
        <div>
            {/* ---------- Header */}
            <div className='header-container'>
                <nav className='navbar'>
                    <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
                        <img src={logo} alt="logo" style={{width: 50, height: 50}}/>
                        <p style={{fontSize: 20}}>OficiosYa!</p>
                    </div>
                    {/* <p style={{fontSize: 20}}>Inicio</p> */}
                    <img src={userImage} alt="userImage" style={{width: 40, height: 40, borderRadius: 100}}/>
                </nav>

                <div style={{marginTop: 80}}>
                    <p style={{textAlign: 'center', fontSize: 20, marginBottom: 20}}>“Encuentra al profesional adecuado para cada tarea en un solo clic”</p>
                    <div style={{display: 'flex', justifyContent: 'center', padding: '0 20px'}}>
                        <FormSearch/>
                    </div>
                </div>
            </div>

            {/* ---------- Cards Filter */}
            <div className='card-container'>
                {filters.map(filter => (
                    <CardFilter
                        key={filter.category}
                        filter={filter}
                    />
                ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', paddingBottom: 50}}>
                <BtnBlue text={'Ver más'}/>
            </div>
        </div>
    )
}
