import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFoodProviders } from "../services/FoodProviderServices";

const FoodProviders = () => {
    const [foodProviders, setFoodProviders] = useState([]);

    useEffect(() => {
        const fetchFoodProviders = async () => {
            try {
                const data = await getFoodProviders();
                console.log(data);
                setFoodProviders(data);
            } catch (error) {
                console.log("gg");
                console.log(error.message);
            }
        };

        fetchFoodProviders();
    }, []);

    return (
        <div>
            <form>
                <input className="mx-auto d-block" type="text" name="providerSearch" id="providerSearch" />
            </form>
            <section className="mt-4">
                <ul className="d-flex flex-column">
                    {foodProviders?.map((provider, index) => (
                        <Link to={`/provider/${provider._id}`} key={index} className="">
                            {provider.name}
                        </Link>
                    ))}

                    <Link className="">Provider</Link>
                    <Link className="">Provider</Link>
                    <Link className="">Provider</Link>
                </ul>
            </section>
        </div>
    );
};

export default FoodProviders;
