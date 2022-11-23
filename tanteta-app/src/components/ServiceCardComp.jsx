import { Link } from "react-router-dom";

const ServiceCardComp = ({ serviceDetails }) => {
    return (
        <div className="service-cards">
            {serviceDetails.slice(0, 10).map(serviceDetail => (
                <div key={serviceDetail.id} id={serviceDetail.id} className={`service-card-component, ${serviceDetail.categoryId}`}>
                    <img src="" alt="service card image" width={200} />
                    <h3>{serviceDetail.name}</h3>
                    <p>Starting at {serviceDetail.startprice} F</p>
                    <p>{serviceDetail.desc}</p>
                    <Link to={`/${serviceDetail.categoryId}/${serviceDetail.nameId}`}>More details</Link>
                    <button>Book</button>
                    <p>Category: <Link to={`/${serviceDetail.categoryId}`}>{serviceDetail.category}</Link></p>
                </div>
            ))}
        </div>
    );
}

export default ServiceCardComp;

/* 
className={`service-card-component, ${serviceDetail.category.replace(/ /g, '-').toLowerCase()}`} 
*/