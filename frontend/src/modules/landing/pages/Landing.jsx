import { Hero } from '../components/Hero'
import { SearchService } from '../components/SearchService'
import { OfferService } from '../components/OfferService'
import { Contacto } from '../components/Contact'
import '../../../core/styles/global.css'


export const Landing = () => {
    return (
        <>
            <header>
                <Hero />
            </header>
            <main>
                <SearchService />
                <OfferService />
                <Contacto />
            </main>
        </>
    )
}