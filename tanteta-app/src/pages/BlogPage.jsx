import HeroComp from "../components/HeroComp";

const BlogPage = () => {
    return (
        <div className="blog-page">
            <section className="hero-section">
                <HeroComp headline={`Blog Page`} />
            </section>
            <p>Components here</p>
        </div>
    );
}

export default BlogPage;
