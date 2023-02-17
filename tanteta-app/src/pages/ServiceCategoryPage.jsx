import { useParams, Link } from "react-router-dom";
import ServiceCardFilterComp from "../components/ServiceCardFilterComp";
import LinkRoutes from "../assets/LinkRoutes";
import NotFoundPage from "./NotFoundPage";
import AllServicesDetails from "../assets/AllServicesDetails";
import HeroComp from "../components/HeroComp";

const ServiceCategoryPage = () => {
    const { categoryId } = useParams();

    const shootingDetail = AllServicesDetails.find(shootingDetail => shootingDetail.categoryId === categoryId);
    if (!shootingDetail) {
        return <NotFoundPage />;
    }

    return (
        <div className="service-categorys-page">
            <section className="hero-section">
                <HeroComp headline={`Service Category: ${shootingDetail.category}`} />
            </section>

            <div className="bread-crumbs">
                <p><Link to={'/'}>Home</Link> &gt; <Link to={`/${LinkRoutes.ServicesPage}`}>Services</Link> &gt; {shootingDetail.category}</p>
            </div>
            <p>Components here</p>

            <ServiceCardFilterComp serviceDetails={AllServicesDetails} slug={categoryId} />

        </div>
    );
}

export default ServiceCategoryPage;