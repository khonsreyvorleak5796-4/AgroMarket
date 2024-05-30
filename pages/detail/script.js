const params = new URLSearchParams(window.location.search);
const categoryId = params.get('category-id');
// const apiToken = '2e79eefd74136248b06f27da2fc503f057a6db43d166d27ac3cc8a20c3da67a1fc3de621e710b23a89ce1ac95fe44807daf44b7dc774e182c458a42b2acb7868fc3ddc6424f22a89d149c807b74d617d920a34b38a40743940e85c2a598e6b30a7117ecb70c2ecd77b54f6cfabbbed40e8acab56b91f545d309808338a948d18';
// const apiUrl = 'https://clever-eggs-512f1b05ad.strapiapp.com/api/products';

// document.addEventListener('DOMContentLoaded', () => {
//     const params = new URLSearchParams(window.location.search);
//     const categoryId = params.get('category-id');

//     if (categoryId) {
//         fetchProductDetails(categoryId);
//     } else {
//         console.error('No category-id found in URL');
//     }
// });

// function fetchProductDetails(id) {
//     const url = `${apiUrl}/${id}?populate=*`;

//     fetch(url, {
//         headers: {
//             'Authorization': `Bearer ${apiToken}`
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Product detail data:', data); // Log the complete response data
//         if (!data || !data.data) {
//             console.log('No product found.');
//         } else {
//             displayProductDetails(data.data);
//         }
//     })
//     .catch(error => console.error('Error:', error));
// }

// function displayProductDetails(product) {
//     const container = document.getElementById('product-detail-container');
//     const attributes = product.attributes;
//     const imageUrl = attributes.images?.data?.attributes?.url || '../../images/default-image-url.jpg'; // Fallback to default image if not available
//     const productDetail = `
//         <div class="col-md-6">
//             <div id="carouselExample" class="carousel slide">
//                 <div class="carousel-inner">
//                     <div class="carousel-item active">
//                         <img src="${imageUrl}" class="d-block w-100" alt="${attributes.name}">
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div class="col-md-6">
//             <h2>${attributes.name}</h2>
//             <p>Price: $${attributes.price}</p>
//             <p>Quantity: ${attributes.quantity}</p>
//             <p>Organic: ${attributes.organic ? 'Yes' : 'No'}</p>
//             <p>Availability: ${attributes.availability ? 'In stock' : 'Out of stock'}</p>
//             <p>Origin Province: ${attributes.originprovince}</p>
//             <hr>
//             <h3><b>Product Owner Contact Information</b></h3>
//             <p>Name: ${attributes.ownername}</p>
//             <p>Email: ${attributes.owneremail}</p>
//             <p>Phone: ${attributes.ownerphone}</p>
//         </div>
//     `;
//     container.innerHTML = productDetail;
// }












const apiUrl = 'https://clever-eggs-512f1b05ad.strapiapp.com/api/products';
const apiToken = '2e79eefd74136248b06f27da2fc503f057a6db43d166d27ac3cc8a20c3da67a1fc3de621e710b23a89ce1ac95fe44807daf44b7dc774e182c458a42b2acb7868fc3ddc6424f22a89d149c807b74d617d920a34b38a40743940e85c2a598e6b30a7117ecb70c2ecd77b54f6cfabbbed40e8acab56b91f545d309808338a948d18';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const categoryId = params.get('category-id');

  if (categoryId) {
    fetchProductDetails(categoryId);
  } else {
    console.error('No category-id found in URL');
  }
});

function fetchProductDetails(id) {
  const url = `${apiUrl}/${id}?populate=*`;

  fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiToken}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Product detail data:', data); // Log the complete response data
    if (!data || !data.data) {
      console.log('No product found.');
    } else {
      displayProductDetails(data.data);
    }
  })
  .catch(error => console.error('Error:', error));
}

function displayProductDetails(product) {
  const container = document.getElementById('product-detail-container');
  const attributes = product.attributes;
  const imageUrl = attributes.images?.data?.attributes?.url || '../../images/default-image-url.jpg'; // Fallback to default image if not available
  const productDetail = `
    <div class="row">
      <div class="col-md-6">
        <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${imageUrl}" class="d-block w-100" alt="${attributes.name}">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h2>${attributes.name}</h2>
        <p>Price: $${attributes.price}</p>
        <p>Quantity: ${attributes.quantity}</p>
        <p>Organic: ${attributes.organic ? 'Yes' : 'No'}</p>
        <p>Availability: ${attributes.availability ? 'In stock' : 'Out of stock'}</p>
        <p>Origin Province: ${attributes.originprovince}</p>
        <hr>
        <h3><b>Product Owner Contact Information</b></h3>
        <p>Name: ${attributes.ownername}</p>
        <p>Email: ${attributes.owneremail}</p>
        <p>Phone: ${attributes.ownerphone}</p>
      </div>
    </div>
  `;
  container.innerHTML = productDetail;
}
