import HeroComp from "../components/HeroComp";

const HomePage = () => {
    return (
        <div className="home-page">
            <section className="hero-section">
                <HeroComp headline={`Home Page`} />
            </section>
            <h3>Capturing memories is our hobby!</h3>
        </div>
    );
}

export default HomePage;