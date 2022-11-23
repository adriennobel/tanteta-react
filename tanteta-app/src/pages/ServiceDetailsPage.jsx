import { useParams, Link } from "react-router-dom";
import LinkRoutes from "../assets/LinkRoutes";
import NotFoundPage from "./NotFoundPage";
import AllServicesDetails from "../assets/AllServicesDetails";
import useToggleTrueFalse from "../hooks/ToggleTrueFalseHook";

const ServiceDetailsPage = () => {
    const { nameId } = useParams();
    const { categoryId } = useParams();

    let checkDetail = AllServicesDetails.find(checkDetail => checkDetail.categoryId === categoryId);
    if (!checkDetail) {
        return <NotFoundPage />;
    }

    let shootingDetail = AllServicesDetails.find(shootingDetail => shootingDetail.nameId === nameId);
    if (!shootingDetail) {
        return <NotFoundPage />;
    }

    function nextSlide() {
        let slides = document.querySelector(".image-slides");
        slides.scrollBy(200, 0);
    }
    function prevSlide() {
        let slides = document.querySelector(".image-slides");
        slides.scrollBy(-200, 0);
    }

    return (
        <div className="service-details-page">
            <h1>Service Detail: {shootingDetail.name}</h1>

            <div className="image-slides">
                {shootingDetail.images &&
                    shootingDetail.images.map((image, i) => (
                        <div key={i} className={`image-slide slide-${i}`} id={`slide-${i}`}>
                            <img src={image.src} alt={image.alt} width="auto" height="300" />
                        </div>
                    ))
                }
            </div>
            <button onClick={prevSlide}>&lt;</button>
            <button onClick={nextSlide}>&gt;</button>

            <div className="bread-crumbs">
                <p><Link to={'/'}>Home</Link> &gt; <Link to={`/${LinkRoutes.ServicesPage}`}>Services</Link> &gt; <Link to={`/${shootingDetail.categoryId}`}>{shootingDetail.category}</Link> &gt; {shootingDetail.name}</p>
            </div>

            {shootingDetail.pricepacks ?
                <div className="price-packs">
                    <h2>Quick Packs</h2>
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
                <h2>Coming Soon...</h2>
            }
        </div>
    );
}

export default ServiceDetailsPage;

// {shootingDetail.pricepack1 ? <p>{shootingDetail.pricepack1.price} XAF: {shootingDetail.pricepack1.pricedesc}</p> : <p>No Price Pack</p>}

// {shootingDetail.pricepack1 && <p>{shootingDetail.pricepack1.price} XAF: {shootingDetail.pricepack1.pricedesc}</p>}