import { Route, Routes } from "react-router";
import { SignUp } from "./SignUp";
import "./tokens.css";
import "./main.css";

function Home() {
    return <h1>Spline</h1>;
}

function NotFound() {
    return <h1>Page not found</h1>;
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
