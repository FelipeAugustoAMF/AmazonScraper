// this component is the search bar the user will use to search for products
import './SearchBar.css';

export const SearchBar = (onSearch) => {
    const container = document.createElement('div');
    container.className = 'input-group';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input';
    input.placeholder = 'Digite o nome do produto';
    input.autocomplete = 'off';

    const button = document.createElement('button');
    button.className = 'button--submit';
    button.type = 'button';
    button.textContent = 'Buscar';

    container.append(input, button);

    button.addEventListener('click', () => {
        const term = input.value.trim();
        onSearch(term);
    });

    input.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            button.click();
        }
    });

    return container;
};


