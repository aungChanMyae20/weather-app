import { FC, FormEvent, useState } from "react";
import { useWeatherContext } from "../../providers/Weather";
import './CitySearch.css';

const CitySearch:FC = () => {
    const { setCity } = useWeatherContext();
    const [query, setQuery] = useState<string>('');

    const handleSearch = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCity(query);
        setQuery('');
    }

    return <div className="search-box">
        <form className="search-form" name="city-search" onSubmit={handleSearch}>
            <input type="text" name="query" value={query} onChange={(e) => setQuery(e.currentTarget.value)} autoComplete="off" placeholder="Search City" />
            <button type="submit">Search</button>
        </form>
    </div>
}

export default CitySearch;