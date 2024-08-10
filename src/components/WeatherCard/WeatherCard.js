import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography, } from '@material-ui/core';
import { getWeatherIconSrc, fetchOpenWeatherData, } from '../../utils/api';
import './WeatherCard.css';
const WeatherCardContainer = ({ children, onDelete }) => {
    return (React.createElement(Box, { mx: '4px', my: '16px' },
        React.createElement(Card, null,
            React.createElement(CardContent, null, children),
            React.createElement(CardActions, null, onDelete && (React.createElement(Button, { color: "secondary", onClick: onDelete },
                React.createElement(Typography, { className: "weatherCard-body" }, "Delete")))))));
};
const WeatherCard = ({ city, tempScale, onDelete }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [cardState, setCardState] = useState('loading');
    useEffect(() => {
        fetchOpenWeatherData(city, tempScale)
            .then((data) => {
            setWeatherData(data);
            setCardState('ready');
        })
            .catch((err) => setCardState('error'));
    }, [city, tempScale]);
    if (cardState == 'loading' || cardState == 'error') {
        return (React.createElement(WeatherCardContainer, { onDelete: onDelete },
            React.createElement(Typography, { className: "weatherCard-title" }, city),
            React.createElement(Typography, { className: "weatherCard-body" }, cardState == 'loading'
                ? 'Loading...'
                : 'Error: could not retrieve weather data for this city.')));
    }
    return (React.createElement(WeatherCardContainer, { onDelete: onDelete },
        React.createElement(Grid, { container: true, justify: "space-around" },
            React.createElement(Grid, { item: true },
                React.createElement(Typography, { className: "weatherCard-title" }, weatherData.name),
                React.createElement(Typography, { className: "weatherCard-temp" }, Math.round(weatherData.main.temp)),
                React.createElement(Typography, { className: "weatherCard-body" },
                    "Feels like ",
                    Math.round(weatherData.main.feels_like))),
            React.createElement(Grid, { item: true }, weatherData.weather.length > 0 && (React.createElement(React.Fragment, null,
                React.createElement("img", { src: getWeatherIconSrc(weatherData.weather[0].icon) }),
                React.createElement(Typography, { className: "weatherCard-body" }, weatherData.weather[0].main)))))));
};
export default WeatherCard;
