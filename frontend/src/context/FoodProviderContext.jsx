import { createContext, useContext } from "react";
import * as foodProviderServices from "../services/FoodProviderServices";

export const FoodProviderContext = createContext();

export const FoodProviderProvider = ({ children }) => {
    const getFoodProviders = async () => {
        const foodProviders = await foodProviderServices.getFoodProviders();
        return foodProviders;
    };

    const getFoodProviderById = async (id) => {
        const response = await foodProviderServices.getFoodProviderById(id);
        return response;
    };

    return (
        <FoodProviderContext.Provider value={{ getFoodProviders, getFoodProviderById }}>
            {children}
        </FoodProviderContext.Provider>
    );
};

export const useFoodProviders = () => {
    const context = useContext(FoodProviderContext);

    if (!context) throw new Error("useFoodProviders turi buti naudojamas su FoodProvider");

    return context;
};
