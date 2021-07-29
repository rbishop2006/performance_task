import React from "react";
import Main from "./ui/layout/Main";
import Navbar from "./ui/layout/Navbar";
import "antd/dist/antd.css";

const App: React.FC = () => {
    return (
        <div className="App">
            <Navbar />
            <Main />
        </div>
    );
};

export default App;
