import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Categories from "../pages/Categories";
import Budgets from "../pages/Budgets";
import Analytics from "../pages/Analytics";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/expenses" element={<Expenses />} />

                    <Route path="/categories" element={<Categories />} />

                    <Route path="/budgets" element={<Budgets />} />

                    <Route path="/analytics" element={<Analytics />} />

                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>

        </BrowserRouter>

    );

}