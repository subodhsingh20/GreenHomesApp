const USD_TO_INR = 15; // Adjusted conversion rate to keep prices between 399-599 INR

function convertPrice(usdPrice) {
    const inrPrice = usdPrice * USD_TO_INR;
    return inrPrice < 399 ? 399 : inrPrice > 599 ? 599 : inrPrice;
}

// Sample data for popular plants
const popularPlants = [
    {
        id: 1,
        name: "Fiddle Leaf Fig",
        price: 31.33,
        image: "fiddle_leaf.jpg",
        description: "Large, lush leaves perfect for indoor spaces."
    },
   {
id: 2,
name: "Snake Plant",
price: 39.33,
image: "snake_plant.webp",
description: "Low maintenance and air purifying."
},
{
id: 3,
name: "Spider Plant",
price: 27.33,
image: "spider.webp",
description: "Easy to grow and great for hanging baskets."
},
{
id: 4,
name: "Peace Lily",
price: 36.00,
image: "peace_lilly.jpg",
description: "Beautiful white flowers and air purifier."
},
{
id: 6,
name: "Boston Fern",
price: 39,
image: "boston_fern.jpg",
description: "Lush green foliage perfect for indoors."
},
{
id: 7,
name: "Jade Plant",
price: 42,
image: "jade.webp",
description: "Succulent with thick, shiny leaves."
},
{
id: 8,
name: "Orchid",
price: 36.00,
image: "orchid.jpg",
description: "Elegant flowering plant with vibrant blooms."
},
{
id: 9,
name: "Pothos",
price: 37,
image: "pothos.jpg",
description: "Trailing plant, easy to care for."
},
{
id: 10,
name: "Lavender",
price: 32.00,
image: "lavender.jpg",
description: "Fragrant and calming flowering plant."
},
{
id: 11,
name: "Rubber Plant",
price: 38,
image: "rubber.jpg",
description: "Bold foliage and easy to maintain."
},
{
id: 12,
name: "English Ivy",
price: 28.00,
image: "english_ivy.jpg",
description: "Classic trailing plant for hanging baskets."
},
{
id: 13,
name: "Money Plant",
price: 20.00,
image: "money_plant.webp",
description: "Popular indoor plant believed to bring good luck and prosperity."
}
]


// Category-specific plant data
const floweringPlants = [
    {
        id: 101,
        name: "Rose",
        price: 33.00,
        image: "rose.jpg",
        description: "Classic red roses for your garden."
    },
    {
        id: 102,
        name: "Tulip",
        price: 27.00,
        image: "tulip.jpg",
        description: "Bright and colorful tulips."
    },
    {
        id: 103,
        name: "Marigold",
        price: 26.50,
        image: "marigold.webp",
        description: "Vibrant marigold flowers."
    },
    {
        id: 104,
        name: "Daisy",
        price: 21.60,
        image: "daisy.jpg",
        description: "Cheerful daisies for indoors."
    },
    {
        id: 105,
        name: "Sunflower",
        price: 30.00,
        image: "sunflower.jpg",
        description: "Bright sunflowers to light up your space."
    }
];

const indoorPlants = [

    {
        id: 202,
        name: "Snake Plant",
        price: 25.50,
        image: "snake_plant.webp",
        description: "Low maintenance and air purifying."
    },
    {
        id: 203,
        name: "Peace Lily",
        price: 30.00,
        image: "peace_lilly.jpg",
        description: "Beautiful white flowers and air purifier."
    },
    {
        id: 204,
        name: "Boston Fern",
        price: 22.50,
        image: "boston_fern.jpg",
        description: "Lush green foliage perfect for indoors."
    },
    {
        id: 205,
        name: "Jade Plant",
        price: 35.00,
        image: "jade.webp",
        description: "Succulent with thick, shiny leaves."
    }
];

const hangingPlants = [

    {
        id: 302,
        name: "English Ivy",
        price: 28.00,
        image: "english_ivy.jpg",
        description: "Classic trailing plant for hanging baskets."
    },
    {
        id: 303,
        name: "Pothos",
        price: 37.00,
        image: "pothos.jpg",
        description: "Trailing plant, easy to care for."
    },
    {
        id: 304,
        name: "Boston Fern",
        price: 39.00,
        image: "boston_fern.jpg",
        description: "Lush green foliage perfect for indoors."
    },
    {
        id: 305,
        name: "String of Pearls",
        price: 28.00,
        image: "string_of_pearls.jpg",
        description: "Unique succulent with bead-like leaves."
    }
];

const medicinalPlants = [
    {
        id: 401,
        name: "Aloe Vera",
        price: 27.00,
        image: "alovera.webp",
        description: "Medicinal plant with healing properties."
    },
    {
        id: 402,
        name: "Lavender",
        price: 32.00,
        image: "lavender.jpg",
        description: "Fragrant and calming flowering plant."
    },
    {
        id: 403,
        name: "Mint",
        price: 30.00,
        image: "mint.png",
        description: "Refreshing and aromatic herb."
    },
    {
        id: 404,
        name: "Chamomile",
        price: 26.00,
        image: "chamomile.jpg",
        description: "Calming herb for teas and remedies."
    },
    {
        id: 405,
        name: "Echinacea",
        price: 28.00,
        image: "echinacea.jpg",
        description: "Boosts immune system naturally."
    }
];

// Function to render plant cards for a given array and container
function renderCategoryPlants(plantsArray) {
    const container = document.getElementById('category-plant-cards');
    if (!container) return;
    container.innerHTML = '';
    plantsArray.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'plant-card';
        const priceInINR = convertPrice(plant.price).toFixed(2);
        card.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" />
            <div class="plant-info">
                <h3>${plant.name}</h3>
                <p>₹${priceInINR}</p>
                <p>${plant.description}</p>
            </div>
            <div class="btn-group">
                <a href="plant-pages/${plant.name.toLowerCase().replace(/\s+/g, '-')}.html" class="view-details btn">View Details</a>
                <button class="buy-now btn" data-id="${plant.id}">Buy Now</button>
                <button class="add-cart btn" data-id="${plant.id}">Add to Cart</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Detect current page and render appropriate category plants
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.endsWith('flowering.html')) {
        renderCategoryPlants(floweringPlants);
    } else if (path.endsWith('indoor.html')) {
        renderCategoryPlants(indoorPlants);
    } else if (path.endsWith('hanging.html')) {
        renderCategoryPlants(hangingPlants);
    } else if (path.endsWith('medicinal.html')) {
        renderCategoryPlants(medicinalPlants);
    } else {
        renderPopularPlants();
    }
});

// DOM elements
const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const closeMenuBtn = document.getElementById('close-menu');
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const plantCardsContainer = document.getElementById('plant-cards');

let cart = [];

// Global function to clear cart
function clearCart() {
    cart = [];
    localStorage.removeItem('greenHomesCart');
    updateCartUI();
    updateCartCount();
}

// Side menu toggle handlers
menuToggle.addEventListener('click', () => {
    sideMenu.classList.add('open');
});

closeMenuBtn.addEventListener('click', () => {
    sideMenu.classList.remove('open');
});

// Close side menu when clicking on any menu link
const sideMenuLinks = sideMenu.querySelectorAll('a');
sideMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        sideMenu.classList.remove('open');
    });
});

// Close side menu when clicking outside of it
document.addEventListener('click', (event) => {
    if (sideMenu.classList.contains('open')) {
        const isClickInside = sideMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside) {
            sideMenu.classList.remove('open');
        }
    }
});

function trapFocus(element) {
    const focusableElements = element.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else { // Tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// Cart modal toggle handlers
cartButton.addEventListener('click', () => {
    updateCartUI();
    cartModal.classList.remove('hidden');
    cartModal.inert = false;
    cartModal.setAttribute('aria-hidden', 'false');
    closeCartBtn.focus();
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
    cartModal.inert = true;
    cartModal.setAttribute('aria-hidden', 'true');
    cartButton.focus();
});

// Initialize modal as inert
cartModal.inert = true;
cartModal.setAttribute('aria-hidden', 'true');

// Load cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem('greenHomesCart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    } else {
        cart = [];
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('greenHomesCart', JSON.stringify(cart));
}

// Update cart count in navbar
function updateCartCount() {
    cartCount.textContent = cart.length;
}

function renderPopularPlants() {
    if (!plantCardsContainer) return;
    plantCardsContainer.innerHTML = '';
    popularPlants.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'plant-card';
        const priceInINR = convertPrice(plant.price).toFixed(2);
        card.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" />
            <div class="plant-info">
                <h3>${plant.name}</h3>
                <p>₹${priceInINR}</p>
                <p>${plant.description}</p>
            </div>
            <div class="btn-group">
                <a href="plant-pages/${plant.name.toLowerCase().replace(/\s+/g, '-')}.html" class="view-details btn">View Details</a>
                <button class="buy-now btn" data-id="${plant.id}">Buy Now</button>
                <button class="add-cart btn" data-id="${plant.id}">Add to Cart</button>
            </div>
        `;
        plantCardsContainer.appendChild(card);
    });
}

// Add item to cart
function findPlantById(id) {
    return popularPlants.concat(floweringPlants, indoorPlants, hangingPlants, medicinalPlants).find(p => p.id === id);
}

function addToCart(plantId) {
    const user = getLoggedInUser();
    if (!user) {
        showToast('Please log in to add items to the cart.');
        return;
    }
    const plant = findPlantById(plantId);
    if (!plant) return;
    const existingItem = cart.find(item => item.id === plantId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...plant, quantity: 1});
    }
    saveCart();
    updateCartCount();
    showToast(`${plant.name} added to cart.`);
}

function buyNow(plantId) {
    const user = getLoggedInUser();
    if (!user) {
        showToast('Please log in to buy items.');
        return;
    }
    const plant = findPlantById(plantId);
    if (!plant) return;
    // Prepare order data for single plant
    const order = {
        items: [
            {
                id: plant.id,
                name: plant.name,
                price: plant.price,
                quantity: 1
            }
        ]
    };
    // Save order data to localStorage
    localStorage.setItem('greenHomesOrder', JSON.stringify(order));
    // Redirect to billing page with correct relative path
    const currentPath = window.location.pathname;
    if (currentPath.includes('/plant-pages/')) {
        window.location.href = '../billing.html';
    } else {
        window.location.href = 'billing.html';
    }
}

// Removed event delegation for buy now and add to cart buttons on home page and category pages to avoid duplicate event handling

// Event delegation for buy now and add to cart buttons on home page
// if (plantCardsContainer) {
//     plantCardsContainer.addEventListener('click', (e) => {
//         if (e.target.classList.contains('add-cart')) {
//             const id = parseInt(e.target.getAttribute('data-id'));
//             addToCart(id);
//         } else if (e.target.classList.contains('buy-now')) {
//             const id = parseInt(e.target.getAttribute('data-id'));
//             buyNow(id);
//         }
//     });
// }

// Event delegation for buy now and add to cart buttons on category pages
// const categoryPlantCardsContainer = document.getElementById('category-plant-cards');
// if (categoryPlantCardsContainer) {
//     categoryPlantCardsContainer.addEventListener('click', (e) => {
//         console.log('Category plant cards container clicked:', e.target);
//         if (e.target.classList.contains('add-cart')) {
//             const id = parseInt(e.target.getAttribute('data-id'));
//             console.log('Add to cart clicked for id:', id);
//             addToCart(id);
//         } else if (e.target.classList.contains('buy-now')) {
//             const id = parseInt(e.target.getAttribute('data-id'));
//             console.log('Buy now clicked for id:', id);
//             buyNow(id);
//         }
//     });
// }

// Global event delegation for buy-now and add-cart buttons on all pages to ensure functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('buy-now')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        if (!isNaN(id)) {
            buyNow(id);
        }
    } else if (e.target.classList.contains('add-cart')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        if (!isNaN(id)) {
            addToCart(id);
        }
    }
});

// Remove item from cart
function removeFromCart(plantId) {
    cart = cart.filter(item => item.id !== plantId);
    saveCart();
    updateCartUI();
    updateCartCount();
}

// Update cart UI
function updateCartUI() {
    cartItemsList.innerHTML = '';
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
        cartTotal.textContent = '0.00';
        checkoutButton.disabled = true;
        return;
    }
    checkoutButton.disabled = false;
    let total = 0;
    cart.forEach(item => {
        const itemTotalINR = convertPrice(item.price) * item.quantity;
        total += convertPrice(item.price) * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>₹${itemTotalINR.toFixed(2)}</span>
            <button class="remove-item" aria-label="Remove ${item.name}" data-id="${item.id}">&times;</button>
        `;
        cartItemsList.appendChild(li);
    });
    const totalINR = total;
    cartTotal.textContent = totalINR.toFixed(2);

    // Add event listeners to remove buttons
    const removeButtons = cartItemsList.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

// Buy now handler
// Checkout handler
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Your cart is empty.');
        return;
    }
    // Prepare order data for all cart items
    const order = {
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }))
    };
    // Save order data to localStorage
    localStorage.setItem('greenHomesOrder', JSON.stringify(order));
    // Redirect to billing page with correct relative path
    const currentPath = window.location.pathname;
    if (currentPath.includes('/plant-pages/')) {
        window.location.href = '../billing.html';
    } else {
        window.location.href = 'billing.html';
    }
});

function getLoggedInUser() {
    const user = localStorage.getItem('greenHomesLoggedInUser');
    return user ? JSON.parse(user) : null;
}

function updateSideMenuUser() {
    const loginMenuItem = document.getElementById('login-menu-item');
    const logoutMenuItem = document.getElementById('logout-menu-item');
    const user = getLoggedInUser();
    if (user && loginMenuItem && logoutMenuItem) {
        loginMenuItem.innerHTML = `<strong>Welcome, ${user.name}</strong>`;
        logoutMenuItem.style.display = 'block';
    } else {
        if (loginMenuItem) {
            loginMenuItem.innerHTML = `<a href="login.html">Login / Sign Up</a>`;
        }
        if (logoutMenuItem) {
            logoutMenuItem.style.display = 'none';
        }
    }
}

// Logout button click handler
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Clear logged-in user from localStorage
            localStorage.removeItem('greenHomesLoggedInUser');
            // Update side menu UI
            updateSideMenuUser();
            // Optionally close the side menu
            const sideMenu = document.getElementById('side-menu');
            if (sideMenu) {
                sideMenu.classList.remove('open');
            }
            // Optionally show a toast or alert
            showToast('You have been logged out.');
        });
    }
});

updateSideMenuUser();

const heroImages = [
    'flowering_hero.jpg',
    'hanging_hero.jpg',
    'header.jpg',
    'hero_image.jpg',
    'medicinal_hero.jpg'
];

let currentHeroIndex = 0;
const heroSection = document.querySelector('.hero');

function changeHeroBackground() {
    if (!heroSection) return;
    currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
    heroSection.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
}

// Set initial background image
if (heroSection) {
    heroSection.style.backgroundImage = `url('${heroImages[0]}')`;
}

// Change background every 5 seconds
setInterval(changeHeroBackground, 3000);

const allPlants = popularPlants.concat(floweringPlants, indoorPlants, hangingPlants, medicinalPlants);

const plantSearchInput = document.getElementById('plant-search');
const searchSuggestions = document.getElementById('search-suggestions');

function clearSuggestions() {
    searchSuggestions.innerHTML = '';
    searchSuggestions.classList.add('hidden');
}

function showSuggestions(plants) {
    clearSuggestions();
    if (plants.length === 0) {
        return;
    }
    plants.forEach(plant => {
        const li = document.createElement('li');
        li.textContent = plant.name;
        li.tabIndex = 0;
        li.addEventListener('click', () => {
            redirectToPlant(plant);
        });
        li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                redirectToPlant(plant);
            }
        });
        searchSuggestions.appendChild(li);
    });
    searchSuggestions.classList.remove('hidden');
}

function redirectToPlant(plant) {
    // Redirect to specific plant page in plant-pages directory
    const currentPath = window.location.pathname;
    const isInPlantPages = currentPath.includes('/plant-pages/');
    // Determine relative path prefix based on current location
    const prefix = isInPlantPages ? '../' : '';
    const plantPage = plant.name.toLowerCase().replace(/\s+/g, '-') + '.html';
    window.location.href = `${prefix}plant-pages/${plantPage}`;
}

function filterPlants(query) {
    if (!query) {
        clearSuggestions();
        return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = allPlants.filter(plant => plant.name.toLowerCase().includes(lowerQuery));
    showSuggestions(filtered.slice(0, 10)); // limit to 10 suggestions
}

if (plantSearchInput) {
    plantSearchInput.addEventListener('input', (e) => {
        filterPlants(e.target.value);
    });
    plantSearchInput.addEventListener('blur', () => {
        // Delay clearing to allow click event on suggestions
        setTimeout(() => {
            clearSuggestions();
        }, 200);
    });
}

function toggleProfilePopup() {
    const popup = document.getElementById('profile-popup');
    popup.classList.toggle('hidden');
}

function closeProfilePopup() {
    const popup = document.getElementById('profile-popup');
    if (!popup.classList.contains('hidden')) {
        popup.classList.add('hidden');
    }
}

function populateProfilePopup() {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (user) {
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-email').textContent = user.email;
    }
}

function logoutUser() {
    sessionStorage.removeItem('loggedInUser');
    localStorage.removeItem('greenHomesUsers');
    // Optionally redirect to login page
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const profileButton = document.getElementById('profile-button');
    const profilePopup = document.getElementById('profile-popup');
    const logoutButton = document.getElementById('profile-logout-button');

    if (profileButton && profilePopup) {
        profileButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleProfilePopup();
            populateProfilePopup();
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            logoutUser();
        });
    }

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (profilePopup && !profilePopup.classList.contains('hidden')) {
            if (!profilePopup.contains(e.target) && e.target.id !== 'profile-button' && !document.getElementById('profile-button').contains(e.target)) {
                closeProfilePopup();
            }
        }
    });
});

function showToast(message) {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.background = 'rgba(255, 58, 58, 0.78)';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.marginTop = '10px';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 2px 6px rgba(17, 124, 0, 0.62)';
    toast.style.fontSize = '14px';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';

    toastContainer.appendChild(toast);

    // Show toast
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
    });

    // Hide and remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => {
            toast.remove();
            // Remove container if empty
            if (toastContainer.children.length === 0) {
                toastContainer.remove();
            }
        });
    }, 3000);
}


document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('index.html')) {
        localStorage.removeItem('greenHomesOrder');

        // Show order success toast if flag is set
        if (localStorage.getItem('showOrderSuccessToast') === 'true') {
            showToast('Your order has been placed successfully.');
            localStorage.removeItem('showOrderSuccessToast');
        }
    }
});

function showAuthPopup() {
    const popup = document.getElementById('auth-popup');
    if (!popup) return;
    popup.classList.remove('hidden');
}

function hideAuthPopup() {
    const popup = document.getElementById('auth-popup');
    if (!popup) return;
    popup.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    // Show popup after 2 seconds only if user is not logged in
    if (!getLoggedInUser()) {
        setTimeout(() => {
            showAuthPopup();
        }, 2000);
    }

    // Button event listeners
    const loginBtn = document.getElementById('login-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html#login';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            hideAuthPopup();
        });
    }
});

// Initialize
loadCart();
updateCartCount();
renderPopularPlants();
