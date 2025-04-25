// this component is responsible for rendering the results of the search
// and displaying them in a grid format. It takes an array of products and a container element as arguments.

import "./ProductList.css";

export function ProductList(products, container) {
    const containerEl =
        typeof container === 'string'
            ? document.querySelector(container)
            : container;

    if (!containerEl) {
        throw new Error('ProductList: container não encontrado');
    }

    // clean the container
    containerEl.innerHTML = '';

    // if there are no products, show a message
    if (!products || products.length === 0) {
        containerEl.innerHTML = '<p class="no-results">Nenhum produto encontrado.</p>';
        containerEl.style.textAlign = 'center';
        return;
    }

    // create the grid container
    const grid = document.createElement('div');
    grid.className = 'products-grid';

    products.forEach((prod) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // image
        if (prod.imageUrl) {
            const img = document.createElement('img');
            img.className = 'product-image';
            img.src = prod.imageUrl;
            img.alt = prod.title;
            card.appendChild(img);
        }

        // text content
        const info = document.createElement('div');
        info.className = 'product-info';

        // title
        const title = document.createElement('h3');
        title.className = 'product-title';
        title.textContent = prod.title;
        info.appendChild(title);

        // rating
        const ratingEl = document.createElement('p');
        ratingEl.className = 'product-rating';
        ratingEl.innerHTML = `Nota:<strong>${prod.rating || " — "}</strong>`;
        info.appendChild(ratingEl);


        // reviews count
        const revEl = document.createElement('p');
        revEl.className = 'product-reviews';
        revEl.innerHTML = `Avaliações: <strong>${prod.reviews || " — "}</strong>`;
        info.appendChild(revEl);

        card.appendChild(info);
        grid.appendChild(card);
    });

    containerEl.appendChild(grid);
}
