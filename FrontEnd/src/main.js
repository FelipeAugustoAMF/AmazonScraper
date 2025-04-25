// this is the main file of the project, it is responsible for creating the main structure of the app and importing all the components
// the project is organized in a modular way, each component is in its own folder with its own style and logic
// some core logic where transformed into components, like the search bar and the product list

import './style.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Loader } from './components/Loader/Loader';
import { Api } from './utils/api';
import { ProductList } from './components/ProductList/ProductList';

const root = document.getElementById('app');

// title
const title = document.createElement('h1');
title.textContent = 'Amazon Product Scraper';
title.style.textAlign = 'center';
title.style.fontSize = '2rem';
root.appendChild(title);

// creates the loader and hides it
const loader = Loader();
loader.classList.add('hidden');
root.appendChild(loader);

// created the results container
const resultsSection = document.createElement('div');
resultsSection.className = 'results-section';
root.appendChild(resultsSection);

// create a search bar using loader and results
const searchBar = SearchBar(async term => {
  // clean any previous message
  resultsSection.innerHTML = '';
  resultsSection.style.textAlign = 'center';

  if (!term) {
    resultsSection.innerHTML = '<p class="info">Digite algo para buscar</p>';
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
    resultsSection.innerHTML = `<p class="error">Erro: ${err.message || err}</p>`;
  }
});

// insere a barra *entre* o título e o loader
root.insertBefore(searchBar, loader);
