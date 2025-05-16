import { fetchRequest } from "../utils/api";

const API_URL = "http://localhost:3000/api/food/order/";

export const createOrder = async (data) => {
    const res = await fetchRequest(`${API_URL}`, "", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};
