// this is the main file of the project, it is responsible for creating the main structure of the app and importing all the components
// the project is organized in a modular way, each component is in its own folder with its own style and logic
// some core logic where transformed into components, like the search bar and the product list

import './style.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Loader } from './components/Loader/Loader';
import { ProductList } from './components/ProductList/ProductList';
import { MessageBox } from './components/MessageBox/MessageBox';
import { Api } from './utils/api';

const root = document.getElementById('app');

// title
const title = document.createElement('h1');
title.textContent = 'Amazon Product Scraper';
title.style.textAlign = 'center';
title.style.fontSize = '2rem';
title.style.marginTop = '20px';
title.style.marginBottom = '10px';
root.appendChild(title);

// creates the loader and hides it
const loader = Loader();
loader.classList.add('hidden');
root.appendChild(loader);

// creates the results container
const resultsSection = document.createElement('div');
resultsSection.className = 'results-section';
root.appendChild(resultsSection);

// creates a search bar using loader and results
const searchBar = SearchBar(async term => {
  // clean any previous message
  resultsSection.innerHTML = '';
  resultsSection.style.textAlign = 'center';

  if (!term) {
    const errorMessage = MessageBox('Digite algo para buscar', true);
    resultsSection.innerHTML = '';
    resultsSection.appendChild(errorMessage);
    return;
  }

  // shows the loader
  loader.classList.remove('hidden');

  try {
    const products = await Api.search(term);
    // hides the loader and show the results
    loader.classList.add('hidden');
    ProductList(products, resultsSection);
  } catch (err) {
    // if any error occurs during the api call, shows the error message
    loader.classList.add('hidden');
    console.error(err);

    const messageBox = MessageBox(err.message || err, true);
    resultsSection.innerHTML = '';
    resultsSection.appendChild(messageBox);
  }
});

// inserts the search bar between the title and the loader
root.insertBefore(searchBar, loader);
