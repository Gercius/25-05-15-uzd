import { fetchRequest } from "../utils/api";

const API_URL = "http://localhost:3000/api/food/meal/";

export const getMealsByMenuId = async (menuId) => {
    const res = await fetchRequest(`${API_URL}menu/`, `${menuId}`, { method: "GET" });
    return res.data;
};
