import { useWeatherContext } from "../../providers/Weather";
import './WeatherBanner.css';

const WeatherBanner:React.FC = () => {
    const { weather, forecast, weatherLoading, dayColor } = useWeatherContext();

    const determindTime = (datetime:string) => {
        const date = datetime.split(' ')[0];
        const time = datetime.split(' ')[1];
        const day = date.split('-')[2];
        let hour = '';
        if (time.split(':')[0] === '00') {
            hour = '1AM';
        } else if (time.split(':')[0] === '12') {
            hour = '12PM';
        } else if (+time.split(':')[0] <= 12) {
            hour = `${+time.split(':')[0]}AM`;
        } else {
            hour = `${+time.split(':')[0] - 12}PM`;
        }
        return `${+day} - ${hour}`;
        // return `${hour}`;
    }

    weatherLoading && <div className="loading" />

    return <div className="banner">
          <div className={`banner-bg ${dayColor}`} />
          {
            weather &&
            <div className="banner-info">
              <div className="banner-header">
                <div className="left">
                  <h2>{weather.name}</h2>
                  <p>{weather.main.temp} °C</p>
                  <p>Humidity - {weather.main.humidity}</p>
                </div>
                <div className="right">
                  <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />
                  <p className="description">{weather.weather[0].description}</p>
                </div>
              </div>
              <div className="forecasts">
                <h3>Hourly forecast - 3hrs interval</h3>
                {
                  forecast &&
                  <div className="forecasts-list">
                    {
                      forecast?.list.slice(0, 5).map((item) => {
                        return <div className="forecast" key={item.dt_txt}>
                          <p>{item.main.temp} °C</p>
                          <div className="forecast-img">
                            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Forecast Icon" />
                          </div>
                          <p>{determindTime(item.dt_txt)}</p>
                        </div>
                      })
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>
}

export default WeatherBanner;