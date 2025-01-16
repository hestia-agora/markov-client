import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/app-layout/app-layout"; // Correct file name
import MainDashboard from "./pages/main-dashboard"; // Import HomePage

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<MainDashboard />} /> {/* MainDashboard */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;