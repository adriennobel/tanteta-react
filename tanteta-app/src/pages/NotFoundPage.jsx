import { Link } from "react-router-dom";
import HeroComp from "../components/HeroComp";

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <section className="hero-section">
                <HeroComp headline={`404: Page Not Found`} />
            </section>
            <p><Link onClick={() => history.back()}>Back to Previous Page</Link></p>
            <p><Link to='/'>Go to Home Page</Link></p>
        </div>
    )
}

export default NotFoundPage;