import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box, Button, Card, CardContent, Grid, Switch, TextField, Typography, } from '@material-ui/core';
import 'fontsource-roboto';
import './options.css';
import { getStoredOptions, setStoredOptions, } from '../utils/storage';
const App = () => {
    const [options, setOptions] = useState(null);
    const [formState, setFormState] = useState('ready');
    useEffect(() => {
        getStoredOptions().then((options) => setOptions(options));
    }, []);
    const handleHomeCityChange = (homeCity) => {
        setOptions(Object.assign(Object.assign({}, options), { homeCity }));
    };
    const handleAutoOverlayChange = (hasAutoOverlay) => {
        setOptions(Object.assign(Object.assign({}, options), { hasAutoOverlay }));
    };
    const handleSaveButtonClick = () => {
        setFormState('saving');
        setStoredOptions(options).then(() => {
            setTimeout(() => {
                setFormState('ready');
            }, 1000);
        });
    };
    if (!options) {
        return null;
    }
    const isFieldsDisabled = formState === 'saving';
    return (React.createElement(Box, { mx: "10%", my: "2%" },
        React.createElement(Card, null,
            React.createElement(CardContent, null,
                React.createElement(Grid, { container: true, direction: "column", spacing: 4 },
                    React.createElement(Grid, { item: true },
                        React.createElement(Typography, { variant: "h4" }, "Weather Extension Options")),
                    React.createElement(Grid, { item: true },
                        React.createElement(Typography, { variant: "body1" }, "Home city name"),
                        React.createElement(TextField, { fullWidth: true, placeholder: "Enter a home city name", value: options.homeCity, onChange: (event) => handleHomeCityChange(event.target.value), disabled: isFieldsDisabled })),
                    React.createElement(Grid, { item: true },
                        React.createElement(Typography, { variant: "body1" }, "Auto toggle overlay on webpage load"),
                        React.createElement(Switch, { color: "primary", checked: options.hasAutoOverlay, onChange: (event, checked) => handleAutoOverlayChange(checked), disabled: isFieldsDisabled })),
                    React.createElement(Grid, { item: true },
                        React.createElement(Button, { variant: "contained", color: "primary", onClick: handleSaveButtonClick, disabled: isFieldsDisabled }, formState === 'ready' ? 'Save' : 'Saving...')))))));
};
const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(React.createElement(App, null), root);
