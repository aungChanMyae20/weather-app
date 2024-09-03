import WeatherBanner from './components/WeatherBanner';
import './App.css';
import Header from './components/Header';
import Recents from './components/Recents';
import { useWeatherContext } from './providers/Weather';

function App() {
  const { dayColor } = useWeatherContext();

  return (
    <div className={`main ${dayColor}`}>
      <Header />
      <div className="content">
        <WeatherBanner />
        <Recents />
      </div>
    </div>
  );
}

export default App;
