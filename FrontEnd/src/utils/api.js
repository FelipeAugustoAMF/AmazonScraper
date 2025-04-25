// handles calls to the scrape API

export const Api = {
    async search(term) {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const response = await fetch(`${API_URL}/api/scrape?keyword=${term}`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error fetching data from API');
        }
        return await response.json();
    }
};