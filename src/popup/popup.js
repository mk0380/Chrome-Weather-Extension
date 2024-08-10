import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box, Grid, InputBase, IconButton, Paper } from '@material-ui/core';
import { Add as AddIcon, PictureInPicture as PictureInPictureIcon, } from '@material-ui/icons';
import 'fontsource-roboto';
import './popup.css';
import WeatherCard from '../components/WeatherCard';
import { setStoredCities, setStoredOptions, getStoredCities, getStoredOptions, } from '../utils/storage';
import { Messages } from '../utils/messages';
const App = () => {
    const [cities, setCities] = useState([]);
    const [cityInput, setCityInput] = useState('');
    const [options, setOptions] = useState(null);
    useEffect(() => {
        getStoredCities().then((cities) => setCities(cities));
        getStoredOptions().then((options) => setOptions(options));
    }, []);
    const handleCityButtonClick = () => {
        if (cityInput === '') {
            return;
        }
        const updatedCities = [...cities, cityInput];
        setStoredCities(updatedCities).then(() => {
            setCities(updatedCities);
            setCityInput('');
        });
    };
    const handleCityDeleteButtonClick = (index) => {
        cities.splice(index, 1);
        const updatedCities = [...cities];
        setStoredCities(updatedCities).then(() => {
            setCities(updatedCities);
        });
    };
    const handleTempScaleButtonClick = () => {
        const updateOptions = Object.assign(Object.assign({}, options), { tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric' });
        setStoredOptions(updateOptions).then(() => {
            setOptions(updateOptions);
        });
    };
    const handleOverlayButtonClick = () => {
        chrome.tabs.query({
            active: true,
        }, (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
            }
        });
    };
    if (!options) {
        return null;
    }
    return (React.createElement(Box, { mx: "8px", my: "16px" },
        React.createElement(Grid, { container: true, justify: "space-evenly" },
            React.createElement(Grid, { item: true },
                React.createElement(Paper, null,
                    React.createElement(Box, { px: "15px", py: "5px" },
                        React.createElement(InputBase, { placeholder: "Add a city name", value: cityInput, onChange: (event) => setCityInput(event.target.value) }),
                        React.createElement(IconButton, { onClick: handleCityButtonClick },
                            React.createElement(AddIcon, null))))),
            React.createElement(Grid, { item: true },
                React.createElement(Paper, null,
                    React.createElement(Box, { py: "4px" },
                        React.createElement(IconButton, { onClick: handleTempScaleButtonClick }, options.tempScale === 'metric' ? '\u2103' : '\u2109')))),
            React.createElement(Grid, { item: true },
                React.createElement(Paper, null,
                    React.createElement(Box, { py: "4px" },
                        React.createElement(IconButton, { onClick: handleOverlayButtonClick },
                            React.createElement(PictureInPictureIcon, null)))))),
        options.homeCity != '' && (React.createElement(WeatherCard, { city: options.homeCity, tempScale: options.tempScale })),
        cities.map((city, index) => (React.createElement(WeatherCard, { city: city, tempScale: options.tempScale, key: index, onDelete: () => handleCityDeleteButtonClick(index) }))),
        React.createElement(Box, { height: "16px" })));
};
const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(React.createElement(App, null), root);
