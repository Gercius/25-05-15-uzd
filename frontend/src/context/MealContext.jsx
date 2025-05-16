import { createContext, useContext } from "react";
import * as mealServices from "../services/MealServices";

export const MealContext = createContext();

export const MealProvider = ({ children }) => {
    const getMealsByMenuId = async (id) => {
        const response = await mealServices.getMealsByMenuId(id);
        return response;
    };

    return <MealContext.Provider value={{ getMealsByMenuId }}>{children}</MealContext.Provider>;
};

export const useMeal = () => {
    const context = useContext(MealContext);

    if (!context) throw new Error("useMeal turi buti naudojamas su MealProvider");

    return context;
};
