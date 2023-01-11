import HeroComp from "../components/HeroComp";

const ContactPage = () => {
    return (
        <div className="contact-page">
            <section className="hero-section">
                <HeroComp headline={`Contact Page`} />
            </section>
            <p>Components here</p>
        </div>
    );
}

export default ContactPage;
