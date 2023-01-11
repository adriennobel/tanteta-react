import { Link } from "react-router-dom";
import HeroComp from "../components/HeroComp";
import ServiceCardFilterComp from "../components/ServiceCardFilterComp";
import AllServicesDetails from "../assets/AllServicesDetails";

const ServicesPage = () => {
    return (
        <div className="services-page">
            <section className="hero-section">
                <HeroComp headline={`Services`} />
            </section>
            <p><Link to={'/'}>Home</Link> &gt; Services</p>
            <ServiceCardFilterComp serviceDetails={AllServicesDetails} slug={""} />
        </div>
    );
}

export default ServicesPage;