document.addEventListener('DOMContentLoaded', () => {
    const USD_TO_INR = 15; // Conversion rate consistent with app.js

    function convertPrice(usdPrice) {
        const inrPrice = usdPrice * USD_TO_INR;
        return inrPrice < 399 ? 399 : inrPrice > 599 ? 599 : inrPrice;
    }

    const billingItemsContainer = document.getElementById('billing-items');
    const totalAmountSpan = document.getElementById('total-amount');

    // Read order data from localStorage
    const orderData = localStorage.getItem('greenHomesOrder');
    if (!orderData) {
        billingItemsContainer.innerHTML = '<p>No items found in your order.</p>';
        totalAmountSpan.textContent = '0.00';
        return;
    }

    const order = JSON.parse(orderData);
    if (!order.items || order.items.length === 0) {
        billingItemsContainer.innerHTML = '<p>No items found in your order.</p>';
        totalAmountSpan.textContent = '0.00';
        return;
    }

    // Render order items
    let total = 0;
    billingItemsContainer.innerHTML = '';
    order.items.forEach(item => {
        const itemTotal = convertPrice(item.price) * item.quantity;
        total += convertPrice(item.price) * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'billing-item';
        itemDiv.innerHTML = `
            <p><strong>${item.name}</strong> x${item.quantity}</p>
            <p>₹${itemTotal.toFixed(2)}</p>
        `;
        billingItemsContainer.appendChild(itemDiv);
    });

    // Display total amount
    totalAmountSpan.textContent = total.toFixed(2);

    // Address form and saved addresses handling
    const billingForm = document.getElementById('billing-form');
    const savedAddressesList = document.getElementById('saved-addresses');

    // Load and render saved addresses from localStorage
    function loadSavedAddresses() {
        const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];
        savedAddressesList.innerHTML = '';
        if (savedAddresses.length === 0) {
            savedAddressesList.innerHTML = '<li>No saved addresses.</li>';
            return;
        }
        savedAddresses.forEach((address, index) => {
            const li = document.createElement('li');
            li.className = 'saved-address-item';
            li.innerHTML = `
                <p><strong>${address.fullName}</strong></p>
                <p>${address.address}, ${address.city}, ${address.state} - ${address.zip}</p>
                <button class="use-address-btn" data-index="${index}">Use this</button>
                <button class="delete-address-btn" data-index="${index}">Delete</button>
            `;
            savedAddressesList.appendChild(li);
        });

        // Add event listeners for the buttons
        const useButtons = document.querySelectorAll('.use-address-btn');
        useButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                showPaymentModal();
            });
        });

        const deleteButtons = document.querySelectorAll('.delete-address-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                deleteAddress(idx);
            });
        });
    }

    // Show payment modal
    function showPaymentModal() {
        const paymentModal = document.getElementById('payment-method-modal');
        paymentModal.setAttribute('aria-hidden', 'false');
        paymentModal.style.display = 'block';
    }

    // Hide payment modal
    function hidePaymentModal() {
        const paymentModal = document.getElementById('payment-method-modal');
        paymentModal.setAttribute('aria-hidden', 'true');
        paymentModal.style.display = 'none';
    }

    // Delete address by index
    function deleteAddress(index) {
        const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];
        savedAddresses.splice(index, 1);
        localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
        loadSavedAddresses();
    }

    // Close button event listener for payment modal
    const paymentModalCloseBtn = document.querySelector('#payment-method-modal .close-btn');
    if (paymentModalCloseBtn) {
        paymentModalCloseBtn.addEventListener('click', () => {
            hidePaymentModal();
        });
    }

    // Payment method radio buttons handling to show/hide input fields
    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const cardDetailsDiv = document.getElementById('card-details');
    const upiDetailsDiv = document.getElementById('upi-details');

    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            if (selectedValue === 'creditCard' || selectedValue === 'debitCard') {
                cardDetailsDiv.style.display = 'block';
                upiDetailsDiv.style.display = 'none';
            } else if (selectedValue === 'upi') {
                cardDetailsDiv.style.display = 'none';
                upiDetailsDiv.style.display = 'block';
            } else if (selectedValue === 'cod') {
                cardDetailsDiv.style.display = 'none';
                upiDetailsDiv.style.display = 'none';
            }
        });
    });

    // Initial load of saved addresses
    loadSavedAddresses();

    // Save new address from form submission
    billingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(billingForm);
        const newAddress = {
            fullName: formData.get('fullName').trim(),
            address: formData.get('address').trim(),
            city: formData.get('city').trim(),
            state: formData.get('state').trim(),
            zip: formData.get('zip').trim()
        };

        // Validate all fields are filled (already required in HTML, but double check)
        if (!newAddress.fullName || !newAddress.address || !newAddress.city || !newAddress.state || !newAddress.zip) {
            alert('Please fill in all address fields.');
            return;
        }

        // Get existing saved addresses
        const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];
        savedAddresses.push(newAddress);
        localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));

        // Clear form
        billingForm.reset();

        // Re-render saved addresses
        loadSavedAddresses();
    });

    // Cancel button event listener to close payment modal
    const cancelPaymentBtn = document.querySelector('.cancel-payment-btn');
    if (cancelPaymentBtn) {
        cancelPaymentBtn.addEventListener('click', () => {
            hidePaymentModal();
        });
    }

    // Order confirmation modal elements
    const orderConfirmationModal = document.getElementById('order-confirmation-modal');
    const orderConfirmationDetails = document.getElementById('order-confirmation-details');
    const orderConfirmationCloseBtn = orderConfirmationModal.querySelector('.close-btn');

    // Close button for order confirmation modal
    if (orderConfirmationCloseBtn) {
        orderConfirmationCloseBtn.addEventListener('click', () => {
            orderConfirmationModal.setAttribute('aria-hidden', 'true');
            orderConfirmationModal.style.display = 'none';
        });
    }

    // Payment form submission handler (Complete Payment button)
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate payment method selection
            const paymentMethod = paymentForm.paymentMethod.value;
            if (!paymentMethod) {
                alert('Please select a payment method.');
                return;
            }

            // Validate card details if card payment selected
            if (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') {
                const cardNumber = paymentForm.cardNumber.value.trim();
                const expiryDate = paymentForm.expiryDate.value.trim();
                const cvv = paymentForm.cvv.value.trim();

                if (!cardNumber.match(/^(\d{4} ?){4}$/)) {
                    alert('Please enter a valid card number.');
                    return;
                }
                if (!expiryDate) {
                    alert('Please enter the expiry date.');
                    return;
                }
                if (!cvv.match(/^\d{3}$/)) {
                    alert('Please enter a valid 3-digit CVV.');
                    return;
                }
            }

            // Validate UPI details if UPI selected
            if (paymentMethod === 'upi') {
                const upiNumber = paymentForm.upiNumber.value.trim();
                if (!upiNumber.match(/^\w+@\w+$/)) {
                    alert('Please enter a valid UPI ID.');
                    return;
                }
            }

            // Gather order details from localStorage
            const orderData = localStorage.getItem('greenHomesOrder');
            if (!orderData) {
                alert('No order data found.');
                return;
            }
            const order = JSON.parse(orderData);

            // Gather saved addresses
            const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];
            if (savedAddresses.length === 0) {
                alert('No saved address found. Please add an address.');
                return;
            }

            // For simplicity, use the first saved address as shipping address
            const shippingAddress = savedAddresses[0];

            // Hide payment modal
            hidePaymentModal();

            // Prepare order confirmation details HTML
            let detailsHTML = `<p><strong>Shipping Address:</strong><br/>
                ${shippingAddress.fullName}<br/>
                ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.zip}
            </p>`;

            detailsHTML += `<p><strong>Payment Method:</strong> ${paymentMethod}</p>`;

            detailsHTML += `<h3>Order Items:</h3><ul>`;
            order.items.forEach(item => {
                detailsHTML += `<li>${item.name} x${item.quantity} - ₹${(item.price * 15).toFixed(2)}</li>`;
            });
            detailsHTML += `</ul>`;

            detailsHTML += `<p><strong>Total Amount:</strong> ₹${order.items.reduce((sum, item) => sum + item.price * 15 * item.quantity, 0).toFixed(2)}</p>`;

            // Show order confirmation modal with details
            orderConfirmationDetails.innerHTML = detailsHTML;
            orderConfirmationModal.setAttribute('aria-hidden', 'false');
            orderConfirmationModal.style.display = 'block';
        });
    }

            // Okay button event listener to clear cart and redirect to home page
            const orderConfirmationOkBtn = document.getElementById('order-confirmation-ok-btn');
            if (orderConfirmationOkBtn) {
                orderConfirmationOkBtn.addEventListener('click', () => {
                    // Save order to userOrders in localStorage for orders page
                    const orderData = localStorage.getItem('greenHomesOrder');
                    if (orderData) {
                        const order = JSON.parse(orderData);

                        // Construct complete order object for orders page
                        const orderToSave = {
                            orderNumber: Date.now().toString(),
                            date: new Date().toLocaleString(),
                            plantName: order.items.length > 1 ? 'Multiple Items' : order.items[0].name,
                            image: order.items.length === 1 ? getImageForPlant(order.items[0].name) : null,
                            totalPrice: order.items.reduce((sum, item) => sum + item.price * 15 * item.quantity, 0).toFixed(2),
                            status: 'Completed',
                            paymentOption: paymentForm.paymentMethod.value,
                            bundle: order.items.length > 1 ? order.items.map(item => item.name) : [],
                            statusDetails: ''
                        };

                        // Helper function to map plant name to image path
                        function getImageForPlant(plantName) {
                            const plantImageMap = {
                                'Aloe Vera': 'alovera.webp',
                                'Boston Fern': 'boston_fern.jpg',
                                'Chamomile': 'Chamomile.jpg',
                                'Daisy': 'daisy.jpg',
                                'Echinacea': 'Echinacea.jpg',
                                'English Ivy': 'english_ivy.jpg',
                                'Fiddle Leaf Fig': 'fiddle_leaf.jpg',
                                'Jade Plant': 'jade.webp',
                                'Lavender': 'lavender.jpg',
                                'Marigold': 'marigold.webp',
                                'Mint': 'mint.png',
                                'Money Plant': 'money_plant.webp',
                                'Orchid': 'orchid.jpg',
                                'Peace Lily': 'peace_lilly.jpg',
                                'Pothos': 'pothos.jpg',
                                'Rose': 'rose.jpg',
                                'Rubber Plant': 'rubber.jpg',
                                'Snake Plant': 'snake_plant.webp',
                                'Spider Plant': 'spider.webp',
                                'String of Pearls': 'string_of_pearls.jpg',
                                'Sunflower': 'sunflower.jpg',
                                'Tulip': 'tulip.jpg'
                            };
                            return plantImageMap[plantName] || 'https://via.placeholder.com/80';
                        }

                        const existingOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
                        existingOrders.push(orderToSave);
                        localStorage.setItem('userOrders', JSON.stringify(existingOrders));
                    }

                    // Clear cart items from localStorage
                    localStorage.removeItem('greenHomesOrder');

                    // Clear cart using global function from app.js
                    if (typeof clearCart === 'function') {
                        clearCart();
                    } else {
                        // Fallback: remove cart from localStorage
                        localStorage.removeItem('greenHomesCart');
                    }

                    // Hide order confirmation modal
                    orderConfirmationModal.setAttribute('aria-hidden', 'true');
                    orderConfirmationModal.style.display = 'none';

                    // Set flag to show order success toast on home page
                    localStorage.setItem('showOrderSuccessToast', 'true');

                    // Redirect to home page
                    window.location.href = 'index.html';
                });
            }
});
