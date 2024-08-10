export function setStoredCities(cities) {
    const vals = {
        cities,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
export function getStoredCities() {
    const keys = ['cities'];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res) => {
            var _a;
            resolve((_a = res.cities) !== null && _a !== void 0 ? _a : []);
        });
    });
}
export function setStoredOptions(options) {
    const vals = {
        options,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
}
export function getStoredOptions() {
    const keys = ['options'];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res) => {
            resolve(res.options);
        });
    });
}
