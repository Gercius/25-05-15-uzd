import { fetchRequest } from "../utils/api";

const API_URL = "http://localhost:3000/api/food/provider/";

export const getFoodProviders = async () => {
    const res = await fetchRequest(API_URL, "", { method: "GET" });
    return res.data;
};

export const getFoodProviderById = async (id) => {
    const res = await fetchRequest(API_URL, `${id}`, { method: "GET" });
    return res.data;
};
