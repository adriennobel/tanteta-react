import { Link } from "react-router-dom";
import ServiceCardComp from "../components/ServiceCardComp";
import AllServicesDetails from "../assets/AllServicesDetails";

const ServicesPage = () => {
    return (
        <div className="services-page">
            <h1>Services</h1>
            <p><Link to={'/'}>Home</Link> &gt; Services</p>
            <ServiceCardComp serviceDetails={AllServicesDetails} />
        </div>
    );
}

export default ServicesPage;