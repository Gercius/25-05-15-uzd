import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/homepage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FoodProvider from "./pages/FoodProvider";
import { FoodProviderProvider } from "./context/FoodProviderContext";
import { MenuProvider } from "./context/MenuContext";
import { MealProvider } from "./context/MealContext";
import { OrderProvider } from "./context/OrderContext";

function App() {
    return (
        <FoodProviderProvider>
            <MenuProvider>
                <MealProvider>
                    <OrderProvider>
                        <Router>
                            <div className="app-container container">
                                <Header />
                                <main className="content">
                                    <Routes>
                                        <Route path="/" element={<HomePage />} />
                                        <Route path="/*" element={<NotFound />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/register" element={<Register />} />
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/provider/:id" element={<FoodProvider />} />
                                    </Routes>
                                </main>
                            </div>
                        </Router>
                    </OrderProvider>
                </MealProvider>
            </MenuProvider>
        </FoodProviderProvider>
    );
}

export default App;
