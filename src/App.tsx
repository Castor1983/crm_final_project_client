import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {ReactNode} from "react";
import Modal from "react-modal";

import { useAuthStore } from "./store/auth";
import LoginPage from "./pages/auth/LoginPage.tsx";
import OrdersPage from "./pages/orders/OrdersPage.tsx";
import AdminPanelPage from "./pages/adminPanel/AdminPanelPage.tsx";
import ActivateManagerPage from "./pages/activateManager/ActivateManagerPage.tsx";
import SessionWatcherComponent from "./components/sessionComponents/SessionWatcherComponent.tsx";
import SessionManagerComponent from "./components/sessionComponents/SessionManagerComponent.tsx";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAuthStore((state) => state.accessToken);
    return token ? children : <Navigate to="/" />;
};

Modal.setAppElement("#root");

const App = () => {
    return (
        <Router>
            <SessionManagerComponent/>
            <SessionWatcherComponent/>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
                <Route path="/adminPanel" element={<ProtectedRoute><AdminPanelPage /></ProtectedRoute>} />
                <Route path="managers/activate/:activateToken" element={<ActivateManagerPage />} />
            </Routes>
        </Router>
    );
};

export default App;