import { Link, useNavigate } from "react-router-dom";
import LinkRoutes from "../assets/LinkRoutes";
import useToggleTrueFalse from "../hooks/ToggleTrueFalseHook";

const NavBar = () => {
    const navigate = useNavigate();

    const { currentState, toggleTrueFalse } = useToggleTrueFalse();
    let addClass = currentState ? " visible" : "";

    return (
        <div className="header-box">
            <div className="logo-box">
                <Link to='/'><img src="" alt="Tanteta' Logo" /></Link>
            </div>
            <nav className="navigation-box">
                <ul className="prim-nav">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to={`/${LinkRoutes.ServicesPage}`}>Services</Link>
                        <button className={`sec-nav-toggler${addClass}`} onClick={toggleTrueFalse}>&gt;</button>
                        <div id="sec-nav-shade-id" className={`sec-nav-shade${addClass}`} onClick={toggleTrueFalse}></div>
                        <ul id="sec-nav-id" className={`sec-nav${addClass}`} onClick={toggleTrueFalse}>
                            <li><Link to={`/${LinkRoutes.StudioShooting}`}>Studio Shooting</Link></li>
                            <li><Link to={`/${LinkRoutes.OutdoorShooting}`}>Outdoor Shooting</Link></li>
                            <li><Link to={`/${LinkRoutes.Homeshoting}`}>Home Shooting</Link></li>
                            <li><Link to={`/${LinkRoutes.EventCoverage}`}>Event Coverage</Link></li>
                            <li><Link to={`/${LinkRoutes.PrintsFrames}`}>Prints & Frames</Link></li>
                        </ul>
                    </li>
                    <li><Link to={`/${LinkRoutes.BlogPage}`}>Blog</Link></li>
                    <li><Link to={`/${LinkRoutes.ContactPage}`}>Contact Us</Link></li>
                </ul>
            </nav>
            <div className="login-box">
                <button onClick={() => navigate('/login')}>Log In</button>
            </div>
        </div>
    );
}

export default NavBar;