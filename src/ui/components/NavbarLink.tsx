import React from "react";

const NavbarLink = ({ text }: { text: string }): JSX.Element => {
    return (
        <a href="#" className="nav-link">
            {text}
        </a>
    );
};

export default NavbarLink;
