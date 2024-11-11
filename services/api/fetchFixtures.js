import axios from "axios";

export async function fetchFixtures() {
    try {
        const url = process.env.EXPO_PUBLIC_MEMCACHED_URL;
        if (!url) {
            throw new Error("Environment variable EXPO_PUBLIC_MEMCACHED_URL is not defined");
        }
        const response = await axios.get(`${url}/api/fixtures`);
        return response.data;
    } catch (error) {
        console.error("Error fetching fixtures:", error);
        return {};
    }
}