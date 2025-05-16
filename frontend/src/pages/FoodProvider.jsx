import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import { useFoodProvider } from "../context/FoodProviderContext";

const FoodProvider = () => {
    const { id } = useParams();
    const { getFoodProviderById } = useFoodProvider();

    const [foodProvider, setFoodProvider] = useState({});

    useEffect(() => {
        const fetchProvider = async (id) => {
            try {
                const data = await getFoodProviderById(id);
                setFoodProvider(data);
                console.log(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchProvider(id);
    }, [id]);

    return (
        <div>
            <h1>{foodProvider.name} menu</h1>
            <Menu providerId={id} />
        </div>
    );
};

export default FoodProvider;
