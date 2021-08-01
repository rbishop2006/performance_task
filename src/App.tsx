import React from "react";
import Main from "./ui/layout/Main";
import Navbar from "./ui/layout/Navbar";
import "antd/dist/antd.css";
import { Layout } from "antd";

const App: React.FC = () => {
    const { Header, Content, Footer } = Layout;

    return (
        <div className="App">
            <Layout>
                <Header
                    style={{
                        position: "fixed",
                        zIndex: 3,
                        width: "100%",
                        height: "inherit",
                    }}
                >
                    <div
                        style={{
                            maxWidth: "1100px",
                            margin: "auto",
                        }}
                    >
                        <Navbar />
                    </div>
                </Header>
                <Content
                    style={{
                        // padding: "0 50px",
                        marginTop: 64,
                        backgroundColor: "white",
                    }}
                >
                    <Main />
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                        position: "fixed",
                        bottom: 0,
                        width: "100%",
                    }}
                >
                    inquireED ©2021 Performance Task by Robert Bishop
                </Footer>
            </Layout>
        </div>
    );
};

export default App;
