import { fetchRequest } from "../utils/api";

const API_URL = "http://localhost:3000/api/food/menu/";

export const getMenuByFoodProviderId = async (providerId) => {
    const res = await fetchRequest(`${API_URL}provider/`, `${providerId}`, { method: "GET" });
    return res.data;
};
