// this components hows a loading animation
// its used when the app is fetching data from the API

import './Loader.css';

export const Loader = () => {
    const div = document.createElement('div');
    div.className = 'loader';
    return div;
}