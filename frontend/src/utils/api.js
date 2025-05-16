export const fetchRequest = async (url, id = "", options = {}) => {
    try {
        const response = await fetch(`${url}${id && id}`, {
            ...options,
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
};
