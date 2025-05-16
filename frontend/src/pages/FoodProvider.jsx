import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFoodProvider } from "../context/FoodProviderContext";
import { useMenu } from "../context/MenuContext";
import { useMeal } from "../context/MealContext";

const FoodProvider = () => {
    const { id } = useParams();
    const { getFoodProviderById } = useFoodProvider();
    const { getMenuByFoodProviderId } = useMenu();
    const { getMealsByMenuId } = useMeal();

    const [foodProvider, setFoodProvider] = useState([]);
    const [menu, setMenu] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchProvider = async (id) => {
            try {
                const data = await getFoodProviderById(id);
                setFoodProvider(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchProvider(id);
    }, [id]);

    useEffect(() => {
        const fetchMenu = async (providerId) => {
            try {
                const data = await getMenuByFoodProviderId(providerId);
                setMenu(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        if (foodProvider) fetchMenu(id);
    }, [foodProvider]);

    useEffect(() => {
        const fetchMeals = async (menuId) => {
            try {
                const data = await getMealsByMenuId(menuId);
                setMeals(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        if (menu?._id) fetchMeals(menu._id);
    }, [menu]);

    if (!foodProvider || !menu) return <div>Loading...</div>;

    return (
        <div>
            <h1>{foodProvider.name}</h1>
            <h2>{menu.name}</h2>
            <ul>
                {meals.map((meal) => (
                    <li key={meal._id}>{meal.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FoodProvider;
