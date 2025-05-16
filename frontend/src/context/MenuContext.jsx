import { createContext, useContext } from "react";
import * as menuServices from "../services/MenuServices";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const getMenuByFoodProviderId = async (id) => {
        const response = await menuServices.getMenuByFoodProviderId(id);
        return response;
    };

    return <MenuContext.Provider value={{ getMenuByFoodProviderId }}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
    const context = useContext(MenuContext);

    if (!context) throw new Error("useMenu turi buti naudojamas su FoodProvider");

    return context;
};
