import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Card } from '@material-ui/core';
import WeatherCard from '../components/WeatherCard';
import { getStoredOptions } from '../utils/storage';
import { Messages } from '../utils/messages';
import './contentScript.css';
const App = () => {
    const [options, setOptions] = useState(null);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        getStoredOptions().then((options) => {
            setOptions(options);
            setIsActive(options.hasAutoOverlay);
        });
    }, []);
    const handleMessages = (msg) => {
        if (msg === Messages.TOGGLE_OVERLAY) {
            setIsActive(!isActive);
        }
    };
    useEffect(() => {
        chrome.runtime.onMessage.addListener(handleMessages);
        return () => {
            // clean up event listener, bug fix from: https://www.udemy.com/course/chrome-extension/learn/#questions/14694484/
            chrome.runtime.onMessage.removeListener(handleMessages);
        };
    }, [isActive]);
    if (!options) {
        return null;
    }
    return (React.createElement(React.Fragment, null, isActive && (React.createElement(Card, { className: "overlayCard" },
        React.createElement(WeatherCard, { city: options.homeCity, tempScale: options.tempScale, onDelete: () => setIsActive(false) })))));
};
const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(React.createElement(App, null), root);
