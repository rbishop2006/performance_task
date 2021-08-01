import { Menu } from "antd";
import React from "react";
import NavbarLink from "../components/NavbarLink";
import "../stylesheets/navbar.css";

const Navbar: React.FC = () => {
    return (
        <>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                <Menu.Item key="1">
                    {" "}
                    <a className="navbar-brand">inquirED</a>
                    <i
                        id="loading-icon"
                        className="fas fa-cog fa-spin fa-2x loading-icon"
                        title="Loading..."
                        style={{ display: "none" }}
                    ></i>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavbarLink text="Admin Panel" />
                </Menu.Item>
                <Menu.Item key="3">
                    <NavbarLink text="Unit Dashboard" />
                </Menu.Item>
                <Menu.Item key="4">
                    <NavbarLink text="Curriculum Library" />
                </Menu.Item>
                <Menu.Item key="5">
                    <NavbarLink text="PD & Learning" />
                </Menu.Item>
                <Menu.Item key="6">
                    <NavbarLink text="Help" />
                </Menu.Item>
                <Menu.Item key="7">
                    <a
                        className="nav-link dropdown-toggle text-lowercase text-capitalize"
                        href="#"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Admin
                        <div
                            className="avatar avatar-sm"
                            style={{ position: "relative" }}
                        >
                            A
                        </div>
                    </a>
                </Menu.Item>
            </Menu>
        </>
    );
};

export default Navbar;
