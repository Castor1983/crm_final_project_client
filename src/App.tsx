import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/auth";
import LoginPage from "./pages/auth/LoginPage.tsx";
import OrdersPage from "./pages/orders/OrdersPage.tsx";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = useAuthStore((state) => state.accessToken);
    return token ? children : <Navigate to="/" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;