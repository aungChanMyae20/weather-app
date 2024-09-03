import { FC } from "react";
import WeatherData from "../../interfaces/weather";
import { useWeatherContext } from "../../providers/Weather";
import './Recents.css';

const Recents:FC = () => {
    const { recentCities, setCity } = useWeatherContext();

    const handleClick = (city:string) => {
        setCity(city);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return <div className="recents">
        <h2>Recent Searches</h2>
        <div>
            {
                recentCities.length > 0 ?
                <ul className="recents-list">
                    {
                        recentCities.map((city:WeatherData) => <li className="recent-item" key={city.name} onClick={() => handleClick(city.name)}>
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
                :
                <div className="no-recent">No Recent Searches</div>
            }
        </div>
    </div>
}

export default Recents;
