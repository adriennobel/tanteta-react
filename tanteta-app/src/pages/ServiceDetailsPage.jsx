import { useParams, Link } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import LinkRoutes from "../assets/LinkRoutes";
import AllServicesDetails from "../assets/AllServicesDetails";
import HeroComp from "../components/HeroComp";
import ImageSliderComp from "../components/ImageSliderComp";
import PriceCalcComp from "../components/PriceCalcComp";
import CalendarBookComp from "../components/CalendarBookComp";

const ServiceDetailsPage = () => {
    const { nameId } = useParams();
    const { categoryId } = useParams();

    let shootingDetail = AllServicesDetails.find(shootingDetail =>
        shootingDetail.nameId === nameId
        && shootingDetail.categoryId === categoryId
    );
    if (!shootingDetail) {
        return <NotFoundPage />;
    }

    return (
        <div className="service-details-page">
            <section className="hero-section">
                <HeroComp headline={`Service Detail: ${shootingDetail.name}`} />
            </section>

            <div className="bread-crumbs">
                <p><Link to={'/'}>Home</Link> &gt; <Link to={`/${LinkRoutes.ServicesPage}`}>Services</Link> &gt; <Link to={`/${shootingDetail.categoryId}`}>{shootingDetail.category}</Link> &gt; {shootingDetail.name}</p>
            </div>

            <section className="image-slider-section">
                <ImageSliderComp shootingDetail={shootingDetail} />
            </section>

            <section className="price-pack-section">
                <h2>Quick Price Packs</h2>
                {shootingDetail.pricepacks ?
                    <div className="price-packs">
                        {
                            shootingDetail.pricepacks.map((pricepack, i) => (
                                <div key={i} className="price-pack">
                                    <p>{pricepack.price} <abbr title="Francs CFA">XAF</abbr></p>
                                    <p>{pricepack.desc}</p>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <p>Coming Soon...</p>
                }
            </section>

            <section className="price-calculator-section">
                <h2>Price Calculator</h2>
                {shootingDetail.calculator ?
                    <PriceCalcComp />
                    :
                    <p>Contact us for custom prices.</p>
                }
            </section>

            <section className="calendar-book-section">
                <h2>Book a time in our Calendar</h2>
                <CalendarBookComp />
            </section>

        </div>
    );
}

export default ServiceDetailsPage;

// {shootingDetail.pricepack1 ? <p>{shootingDetail.pricepack1.price} XAF: {shootingDetail.pricepack1.pricedesc}</p> : <p>No Price Pack</p>}

// {shootingDetail.pricepack1 && <p>{shootingDetail.pricepack1.price} XAF: {shootingDetail.pricepack1.pricedesc}</p>}