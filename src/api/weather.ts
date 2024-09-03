import axios from "axios";

interface ModalData {
    text: string
    onOK?: () => void
}

const weatherAPI = process.env.REACT_APP_WEATHER_API_KEY;

const fetchWeather = async (city: string, openModal?: (modalData: ModalData) => void) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPI}`);
        return response?.data;
    } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
            openModal && openModal({ text: error.response?.data.message || error.message });
        }
    }
}

const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherAPI}`);
        return response?.data;
    } catch (error) {
        console.error('Error getting data by lat-lon: ', error);
    }
}

const fetchForecast = async (city: string, lat: number, lon: number) => {
    try {
        let response = null;
        if (city !== "") {
            response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${weatherAPI}`);
        } else {
            response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherAPI}`);
        }
        return response?.data;
    } catch (error) {
        console.error('Error getting forecast: ', error);
    }
}

const Weather = {
    fetchWeather,
    fetchWeatherByCoordinates,
    fetchForecast
}

export default Weather;
