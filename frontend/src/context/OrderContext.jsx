import { createContext, useContext } from "react";
import * as orderServices from "../services/OrderServices";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const createOrder = async (data) => {
        const response = await orderServices.createOrder(data);
        return response;
    };

    return <OrderContext.Provider value={{ createOrder }}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
    const context = useContext(OrderContext);

    if (!context) throw new Error("useOrder turi buti naudojamas su OrderProvider");

    return context;
};
