import '../styles/NavBarStyles.css'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LinkRoutes from "../assets/LinkRoutes";

const NavBarComp = () => {
    const navigate = useNavigate();

    const [state, setState] = useState(false);
    let toggleSecNavVar = state ? "visible" : "";

    const [scrollState, setScrollState] = useState("top");

    function toggleSecNav() {
        setState(prevstate => !prevstate);
        console.log(state);
    }

    window.onclick = function (e) {
        if (e.target.id !== "sec-nav-toggler-id") {
            if (state === true) {
                setState(prevstate => !prevstate);
                console.log(state);
            }
        }
    }

    window.onscroll = function () {
        if (window.pageYOffset > 50) {
            setScrollState("scrolled");
        } else {
            setScrollState("top");
        }
    }

    return (
        <div className={`header-box ${scrollState}`}>
            <div className="logo-box">
                <Link to='/'><img src="" alt="Tanteta' Logo" /></Link>
            </div>
            <nav className="navigation-box">
                <ul className="prim-nav">
                    <li className="nav-item"><Link to='/'>Home</Link></li>
                    <li className="nav-item sup-nav"><Link to={`/${LinkRoutes.ServicesPage}`}>Services</Link>
                        <button id="sec-nav-toggler-id" className={`sec-nav-toggler ${toggleSecNavVar}`} onClick={toggleSecNav}>&gt;</button>
                        {/* <div id="sec-nav-shade-id" className={`sec-nav-shade${addClass}`} onClick={toggleTrueFalse}></div> */}
                        <div className={`sec-nav ${toggleSecNavVar}`}>
                            <ul id="sec-nav-id">
                                <li className="sec-nav-item"><Link to={`/${LinkRoutes.StudioShooting}`}>Studio Shooting</Link></li>
                                <li className="sec-nav-item"><Link to={`/${LinkRoutes.OutdoorShooting}`}>Outdoor Shooting</Link></li>
                                <li className="sec-nav-item"><Link to={`/${LinkRoutes.Homeshoting}`}>Home Shooting</Link></li>
                                <li className="sec-nav-item"><Link to={`/${LinkRoutes.EventCoverage}`}>Event Coverage</Link></li>
                                <li className="sec-nav-item"><Link to={`/${LinkRoutes.PrintsFrames}`}>Prints & Frames</Link></li>
                            </ul>
                        </div>

                    </li>
                    <li className="nav-item"><Link to={`/${LinkRoutes.BlogPage}`}>Blog</Link></li>
                    <li className="nav-item"><Link to={`/${LinkRoutes.ContactPage}`}>Contact Us</Link></li>
                </ul>
            </nav>
            <div className="login-box">
                <button onClick={() => navigate('/login')}>Log In</button>
            </div>
        </div>
    );
}

export default NavBarComp;