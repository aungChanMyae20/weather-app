import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import WeatherData from "../../interfaces/weather";
import Weather from "../../api/weather";
import ForecastData from "../../interfaces/forecast";
import { useModalContext } from "../Modal";
import LocalStorageHelper from "../../utils/LocalStorageHelper";

interface WeatherValue {
    weather: WeatherData | null
    forecast: ForecastData | null
    weatherLoading: boolean
    dayColor: string
    setCity: React.Dispatch<React.SetStateAction<string>>
    recentCities: WeatherData[]
}

const WeatherContext = createContext<WeatherValue | undefined>(undefined);

const useWeatherContext = ():WeatherValue => {
    const context = useContext(WeatherContext);
    if (!context) throw new Error('useWeatherContext must be used within React component');
    return context;
}

interface Props {
    children: ReactNode
}

const WeatherProvider:FC<Props> = ({ children }) => {
    const { openModal } = useModalContext();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
    const [dayColor, setDayColor] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [recentCities, setRecentCities] = useState<WeatherData[]>([]);

    useEffect(() => {
        const recentsLS = LocalStorageHelper.getItem('cities') || [];
        if (recentsLS.length > 0) {
            getWeatherData(recentsLS);
        }

        navigator.geolocation.getCurrentPosition(position => {
            getWeather(position.coords.latitude, position.coords.longitude);
        });

    }, []);

    async function getWeather(lat:number, lon:number) {
        const weather = await Weather.fetchWeatherByCoordinates(lat, lon);
        if (weather) {
            setWeatherLoading(false);
            setWeather(weather);
            const isDayTime = weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset;
            setDayColor(isDayTime ? 'day' : 'night');
            getForecast('', lat, lon);
        }
    }
    
    async function getForecast(city: string, lat:number, lon:number) {
        const forecast = await Weather.fetchForecast(city, lat, lon);
        if (forecast) {
            setForecast(forecast);
        }
    }

    async function searchWeather(city:string) {
        const weather:WeatherData = await Weather.fetchWeather(city, openModal);
        if (weather) {
            setWeatherLoading(false);
            setWeather(weather);
            const isDayTime = weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset;
            setDayColor(isDayTime ? 'day' : 'night');
            getForecast(city, 0, 0);
            const cities = LocalStorageHelper.getItem('cities') || [];
            if (cities.length >= 0 && !cities.some((cityLS:string) => cityLS.toLowerCase() === weather.name.toLowerCase())) {
                if (cities.length >= 20) {
                    cities.pop();
                }
                LocalStorageHelper.setItem('cities', [city, ...cities]);
                setRecentCities([weather, ...recentCities]);
            }
        }
    }

    async function getWeatherData(cities:string[]) {
        const recentsData:WeatherData[] = [];
        cities.forEach(async (city:string) => {
            const weather:WeatherData = await Weather.fetchWeather(city);
            if (weather) {
                recentsData.push(weather);
            }
        });
        setRecentCities(recentsData);
    }

    useEffect(() => {
        if (city !== '') {
            searchWeather(city);
        }
    }, [city])

    const storeWeather = useMemo(() => {
        return {
            weather,
            forecast,
            weatherLoading,
            dayColor,
            setCity,
            recentCities
        }
    }, [weather, forecast, weatherLoading, dayColor, city, recentCities]);

    return <WeatherContext.Provider value={storeWeather}>
        {children}
    </WeatherContext.Provider>
}
export { WeatherProvider, useWeatherContext };
