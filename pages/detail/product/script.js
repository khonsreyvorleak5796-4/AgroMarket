const apiToken = '2e79eefd74136248b06f27da2fc503f057a6db43d166d27ac3cc8a20c3da67a1fc3de621e710b23a89ce1ac95fe44807daf44b7dc774e182c458a42b2acb7868fc3ddc6424f22a89d149c807b74d617d920a34b38a40743940e85c2a598e6b30a7117ecb70c2ecd77b54f6cfabbbed40e8acab56b91f545d309808338a948d18';
const apiUrl = 'https://clever-eggs-512f1b05ad.strapiapp.com/api/products?populate=*&pagination[page]=1&pagination[pageSize]=34';

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayProducts(apiUrl, 'product-container');
});

function fetchAndDisplayProducts(url, containerId) {
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${apiToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Complete response data:', data); // Log the complete response data
        if (!data || !data.data || data.data.length === 0) {
            console.log('No data found.');
        } else {
            displayProducts(data.data, containerId);
        }
    })
    .catch(error => console.error('Error:', error));
}

function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
        const attributes = product.attributes;
        const imageUrl = attributes.images?.data?.attributes?.url || 'default-image-url.jpg'; // Fallback to default image if not available
        const productCard = `
            <div class="products">
                <div class="image">
                    <img src="${imageUrl}" alt="${attributes.name}">
                </div>
                <div class="paragraph">
                    <div class="name-p"><b>${attributes.name}</b></div>
                    <div class="price-p"><b><i>$ ${attributes.price}</i></b></div>
                    <div class="Quantity">Quantity: ${attributes.quantity}</div>
                    <div class="text">${attributes.originprovince}</div>
                    <a href="/pages/detail/index.html?category-id=${product.id}"><button>Add to cart</button></a>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', productCard);
    });
}
