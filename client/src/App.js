import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";
import Creator from "./components/Creator/Creator";

const App = () => {
    const user = JSON.parse(localStorage.getItem("profile"));

    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={<Navigate replace to="/posts" />}
                    />
                    <Route path="/posts" exact element={<Home />} />
                    <Route path="/posts/search" exact element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/creators/:name" exact element={<Creator />} />
                    <Route
                        path="/auth"
                        exact
                        element={
                            !user ? <Auth /> : <Navigate replace to="/posts" />
                        }
                    />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};

export default App;
