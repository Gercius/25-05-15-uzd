import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFoodProvider } from "../context/FoodProviderContext";
import { useMenu } from "../context/MenuContext";
import { useMeal } from "../context/MealContext";
import { useOrder } from "../context/OrderContext";

const FoodProvider = () => {
    const { id } = useParams();
    const { getFoodProviderById } = useFoodProvider();
    const { getMenuByFoodProviderId } = useMenu();
    const { getMealsByMenuId } = useMeal();
    const { createOrder } = useOrder();

    const [foodProvider, setFoodProvider] = useState([]);
    const [menu, setMenu] = useState([]);
    const [meals, setMeals] = useState([]);
    const [order, setOrder] = useState({});

    console.log(order);

    //     {
    //   "meals": [
    //     {
    //       "meal": "68262e9df520a58e7bdb03c3",
    //       "quantity": 1
    //     }
    //   ],
    //   "menu": "68263d5a8fe461dc12687a6e",
    //   "food_provider": "68262912427381c15ddbc8fc"
    // }

    const handleFormInput = (e, name) => {
        const quantity = Number(e.target.value);
        setOrder((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                quantity: quantity,
            },
        }));
    };

    const submitOrder = async (e) => {
        e.preventDefault();
        console.log(order);
        const finalizedOrder = {
            meals: Object.entries(order).map(([name, data]) => {
                return {
                    meal: data.id,
                    quantity: data.quantity,
                };
            }),
            menu: menu._id,
            food_provider: foodProvider._id,
        };

        await createOrder(finalizedOrder);
        console.log(finalizedOrder);
    };

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

                const newOrder = {};
                data.forEach((meal) => {
                    newOrder[meal.name] = { name: meal.name, id: meal._id, quantity: 0 };
                });
                setOrder(newOrder);
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
                    <li className="meal d-flex justify-content-between my-3" key={meal._id}>
                        <p className="p-0 m-0">- {meal.name}</p>
                    </li>
                ))}
            </ul>
            <div>
                <h3>Užsakymas</h3>
                <form onSubmit={submitOrder} action="">
                    {Object.entries(order).map(([mealName, mealData], index) => (
                        <div key={index} className="form-field d-flex justify-content-between">
                            <label htmlFor="">{mealName}</label>
                            <input
                                onChange={(e) => handleFormInput(e, mealName)}
                                type="number"
                                min={0}
                                max={5}
                                value={mealName.quantity}
                            />
                        </div>
                    ))}
                    <button type="submit" className="my-2">
                        Pateikti
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FoodProvider;
