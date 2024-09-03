export default interface WeatherData {
    dt: number;
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    sys: {
        sunrise: number;
        sunset: number;
    }
}