import { useEffect, useState } from "react";
import { useMenu } from "../context/MenuContext";

const Menu = ({ providerId }) => {
    const [menu, setMenu] = useState([]);
    const { getMenuByFoodProviderId } = useMenu();

    useEffect(() => {
        const fetchMenu = async (id) => {
            try {
                const data = await getMenuByFoodProviderId(id);
                setMenu(data);
                console.log(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchMenu(providerId);
    }, [providerId]);

    return <div>{menu.name}</div>;
};

export default Menu;
