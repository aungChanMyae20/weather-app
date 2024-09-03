import { FC } from "react";
import './Header.css';
import CitySearch from "../CitySearch";

const Header:FC = () => {
    return <div className="header">
        <CitySearch />
    </div>
}

export default Header;
