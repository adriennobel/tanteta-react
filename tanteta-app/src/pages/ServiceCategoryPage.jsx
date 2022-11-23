import { useParams, Link } from "react-router-dom";
import ServiceCardFilterComp from "../components/ServiceCardFilterComp";
import LinkRoutes from "../assets/LinkRoutes";
import NotFoundPage from "./NotFoundPage";
import AllServicesDetails from "../assets/AllServicesDetails";

const ServiceCategoryPage = () => {
    const { categoryId } = useParams();

    const shootingDetail = AllServicesDetails.find(shootingDetail => shootingDetail.categoryId === categoryId);
    if (!shootingDetail) {
        return <NotFoundPage />;
    }

    return (
        <div className="service-categorys-page">
            <h1>Service Category: {shootingDetail.category}</h1>
            <p><Link to={'/'}>Home</Link> &gt; <Link to={`/${LinkRoutes.ServicesPage}`}>Services</Link> &gt; {shootingDetail.category}</p>
            <p>Components here</p>

            <ServiceCardFilterComp serviceDetails={AllServicesDetails} slug={categoryId} />

        </div>
    );
}

export default ServiceCategoryPage;