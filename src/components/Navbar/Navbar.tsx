import "./Navbar.css"
import { Link } from "react-router-dom";
import NavbarIcon from "../../assets/NavbarIcon.png"
import { Button } from "../Button/Button";

export const Navbar = () => {

    return(
        <>
            <div className="container">
                <div className="logo">
                    <img src={NavbarIcon} alt="Navbar Icon" className="NavbarIcon" />
                    <Link to="/" className="title">Bedtime Story Generator</Link>
                </div>

                <div className="buttons">
                    <Button to="/archive" label="Archive" />
                    <Button to="/create" label="Create" />
                </div>
            </div>       
        </>
    )
}