import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <h1>404: Page Not Found</h1>
            <Link onClick={() => history.back()}>Back to Previous Page</Link>
        </div>
    )
}

export default NotFoundPage;