import React from "react"
import Header from "../components/Header";

const ConnectionPage = () => {
    return (
        <div>
            <Header />
            <h2> Você está conectado ao AP: null </h2>
            <ul>
                {["teste1", "teste2", "teste3", "teste4"].map((user,idx) => {
                    return <li key={idx}>{user}</li>
                })}
            </ul>
        </div>
    );
};

export default ConnectionPage;