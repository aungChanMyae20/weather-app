import { FC, useEffect, useState } from "react";
import WeatherData from "../../interfaces/weather";
import { useWeatherContext } from "../../providers/Weather";
import './Recents.css';

const Recents:FC = () => {
    const { recentCities, setCity } = useWeatherContext();
    const [cities, setCities] = useState<WeatherData[]>([]);

    useEffect(() => {
        setCities(recentCities);
    }, [recentCities]);

    const handleClick = (city:string) => {
        setCity(city);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return <div className="recents">
        {
            cities.length > 0 &&
            <>
                <h2>Recent Searches</h2>
                <div>
                    <ul className="recents-list">
                        {
                            cities.map((city:WeatherData) => <li className="recent-item" key={city.name} onClick={() => handleClick(city.name)}>
                                <div className="left">
                                    <h3>{city.name} - {city.main.temp} °C</h3>
                                </div>
                                <div className="right">
                                    <div className="recent-img">
                                        <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt={city.weather[0].description} />
                                    </div>
                                </div>
                            </li>)
                        }
                    </ul>
                </div>
            </>
        }
    </div>
}

export default Recents;
