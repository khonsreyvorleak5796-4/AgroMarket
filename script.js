const apiToken = '2e79eefd74136248b06f27da2fc503f057a6db43d166d27ac3cc8a20c3da67a1fc3de621e710b23a89ce1ac95fe44807daf44b7dc774e182c458a42b2acb7868fc3ddc6424f22a89d149c807b74d617d920a34b38a40743940e85c2a598e6b30a7117ecb70c2ecd77b54f6cfabbbed40e8acab56b91f545d309808338a948d18';
const apiUrl = 'https://clever-eggs-512f1b05ad.strapiapp.com/api/products?';

function fetchAndDisplayProducts(url, containerId) {
  fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
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
    const imageUrl = attributes.images?.data?.attributes?.url || 'default-image-url.jpg';
    const productLink = `../pages/detail/?index.html?id=${product.id}`;
    
    const productCard = `
      <div class="col-md-4">
        <div class="card position-relative">
          <a href="../../pages/detail/index.html?category-id=${product.id}">
            <img src="${imageUrl}" class="card-img-top" alt="${attributes.name}">
          </a>
          <div class="card-body">
            <h5 class="card-title">${attributes.name}</h5>
            <p class="card-text">Quantity: ${attributes.quantity}</p>
            <p class="card-text">Price: $${attributes.price} per Kg</p>
            <p class="card-text">organic: ${attributes.organic}</p>
            <p class="card-text">Province: ${attributes.originprovince}</p>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', productCard);
  });
}

// URLs for each category
const fruitsUrl = `${apiUrl}filters[category_ids][CategoryID][$eq]=1&populate=*&pagination[limit]=6`;
const vegetablesUrl = `${apiUrl}filters[category_ids][CategoryID][$eq]=2&populate=*&pagination[limit]=6`;
const tractorsUrl = `${apiUrl}filters[category_ids][CategoryID][$eq]=3&populate=*&pagination[limit]=6`;
const fertilizersUrl = `${apiUrl}filters[category_ids][CategoryID][$eq]=4&populate=*&pagination[limit]=6`;

// Fetch and display products for each category
fetchAndDisplayProducts(fruitsUrl, 'fruits-container');

 fetchAndDisplayProducts(vegetablesUrl, 'vegetables-container');
 fetchAndDisplayProducts(tractorsUrl, 'tractors-container');
 fetchAndDisplayProducts(fertilizersUrl, 'fertilizers-container');


 document.addEventListener('DOMContentLoaded', () => {
  // Handle active button state on products page
  const params = new URLSearchParams(window.location.search);
  const categoryId = params.get('CategoryID');
  if (categoryId) {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.btn-group .btn');
    buttons.forEach(button => {
      button.classList.remove('active');
    });

    // Add active class to the current category button
    const activeButton = document.querySelector(`.btn-group .btn[href*="CategoryID=${categoryId}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }
  
  // Your existing fetch and display logic goes here
  // Example:
  // fetchAndDisplayProducts(categoryId, 'product-container');
});
