import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined. Please check your environment variables.");
}

export const runModel = async (params) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/`,
            params,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        console.error("Error running model:", error.message || error);
        throw error;
    }
};
