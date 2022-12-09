import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LinkRoutes from "../assets/LinkRoutes";
import NotFoundPage from "./NotFoundPage";
import AllServicesDetails from "../assets/AllServicesDetails";
import PriceCalcComp from "../components/PriceCalcComp";

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

    let [count, setCount] = useState(0);
    let [width, setWidth] = useState(0);
    let imgArr = [];

    useEffect(() => {
        imgArr = document.querySelectorAll('.image-slide');
        console.log("init width to: " + width);
    });

    function nextSlide() {

        if (count >= 0 && count < imgArr.length - 1) {
            width = width + imgArr[count].offsetWidth;
            setWidth(width);

            document.querySelector(".image-slides").style.transform = `translateX(-${width}px)`;

            count = count + 1;
            setCount(count);
        }

        console.log(count);
        console.log(width);
        console.log(imgArr[count]);
    }

    function prevSlide() {

        if (count > 0) {
            width = width - imgArr[count - 1].offsetWidth;
            setWidth(width);

            document.querySelector(".image-slides").style.transform = `translateX(-${width}px)`;

            count = count - 1;
            setCount(count);
        }

        console.log(count);
        console.log(width);
        console.log(imgArr[count]);
    }

    return (
        <div className="service-details-page">
            <h1>Service Detail: {shootingDetail.name}</h1>

            <div className="bread-crumbs">
                <p><Link to={'/'}>Home</Link> &gt; <Link to={`/${LinkRoutes.ServicesPage}`}>Services</Link> &gt; <Link to={`/${shootingDetail.categoryId}`}>{shootingDetail.category}</Link> &gt; {shootingDetail.name}</p>
            </div>

            <section className="image-slider-section">
                <div className="image-slides">
                    {shootingDetail.images ?
                        shootingDetail.images.map((image, i) => (
                            <div key={i} className={`image-slide slide-${i}`} id={`slide-${i}`}>
                                <img className="image" src={image.src} alt={image.alt} width="auto" height="300" />
                            </div>
                        ))
                        :
                        <div className={`image-slide slide-1`} id={`slide-1`}>
                            <img src="/Image_Coming_Soon.png" alt="coming soon image placeholder" width="auto" height="300" />
                        </div>
                    }
                </div>
                <button onClick={prevSlide}>Prev</button>
                <button onClick={nextSlide}>Next</button>
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
                <h2>Price Calculaator</h2>
                {shootingDetail.calculator ?
                    <PriceCalcComp />
                    :
                    <p>Contact us for custom prices.</p>
                }
            </section>

        </div>
    );
}

export default ServiceDetailsPage;

// {shootingDetail.pricepack1 ? <p>{shootingDetail.pricepack1.price} XAF: {shootingDetail.pricepack1.pricedesc}</p> : <p>No Price Pack</p>}

// {shootingDetail.pricepack1 && <p>{shootingDetail.pricepack1.price} XAF: {shootingDetail.pricepack1.pricedesc}</p>}