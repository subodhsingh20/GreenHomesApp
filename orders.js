document.addEventListener('DOMContentLoaded', () => {
    const ordersKey = 'userOrders';

    // Mapping of plant names to local image paths
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

    // Mapping of plant names to prices
    const plantPriceMap = {
        'Aloe Vera': 250,
        'Boston Fern': 300,
        'Chamomile': 200,
        'Daisy': 180,
        'Echinacea': 220,
        'English Ivy': 270,
        'Fiddle Leaf Fig': 350,
        'Jade Plant': 280,
        'Lavender': 240,
        'Marigold': 260,
        'Mint': 150,
        'Money Plant': 320,
        'Orchid': 400,
        'Peace Lily': 330,
        'Pothos': 290,
        'Rose': 310,
        'Rubber Plant': 300,
        'Snake Plant': 340,
        'Spider Plant': 230,
        'String of Pearls': 210,
        'Sunflower': 190,
        'Tulip': 200
    };

    function getOrders() {
        const orders = localStorage.getItem(ordersKey);
        return orders ? JSON.parse(orders) : [];
    }

    function saveOrders(orders) {
        localStorage.setItem(ordersKey, JSON.stringify(orders));
    }

    // Toast notification function
    function showToast(message) {
        let toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    function renderOrders() {
        const orders = getOrders();
        const container = document.getElementById('ordersContainer');
        container.innerHTML = '';

        if (orders.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-orders-message';
            emptyMessage.textContent = 'Your order history is empty. Place an order to get started.';
            emptyMessage.style.fontSize = '1.2rem';
            emptyMessage.style.color = '#555';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.marginTop = '40px';
            container.appendChild(emptyMessage);
            return;
        }

        // Group orders by orderNumber to avoid duplicate entries for multiple items
        const groupedOrdersMap = new Map();
        orders.forEach(order => {
            if (groupedOrdersMap.has(order.orderNumber)) {
                const existingOrder = groupedOrdersMap.get(order.orderNumber);
                // Merge bundles if present
                if (order.bundle && order.bundle.length > 0) {
                    // Merge unique bundle items only
                    const existingBundle = existingOrder.bundle || [];
                    const newBundle = order.bundle.filter(item => !existingBundle.includes(item));
                    existingOrder.bundle = existingBundle.concat(newBundle);
                }
                // Optionally, update totalPrice if needed (sum or keep max)
                existingOrder.totalPrice = Math.max(existingOrder.totalPrice || 0, order.totalPrice || 0);
                // Merge plantName to 'Multiple Items' if any order has multiple items
                if (existingOrder.plantName !== 'Multiple Items' && order.plantName === 'Multiple Items') {
                    existingOrder.plantName = 'Multiple Items';
                }
                // Merge other fields if necessary
            } else {
                // Clone order object to avoid mutation issues
                groupedOrdersMap.set(order.orderNumber, {...order});
            }
        });

        const groupedOrders = Array.from(groupedOrdersMap.values());

        groupedOrders.forEach((order, index) => {
            const card = document.createElement('div');
            card.className = 'order-card';

            const header = document.createElement('div');
            header.className = 'order-header';
            header.textContent = `${order.date || 'Date Unknown'} | Order number ${order.orderNumber || index + 1}`;
            card.appendChild(header);

            const content = document.createElement('div');
            content.className = 'order-content';

            const info = document.createElement('div');
            info.className = 'order-info';

            if (order.plantName === 'Multiple Items') {
                // For multiple items, show plant names with images and prices
                const bundleContainer = document.createElement('div');
                bundleContainer.className = 'order-details';

                order.bundle.forEach((plantName) => {
                    const plantDiv = document.createElement('div');
                    plantDiv.style.display = 'flex';
                    plantDiv.style.alignItems = 'center';
                    plantDiv.style.marginBottom = '5px';

                    const img = document.createElement('img');
                    img.src = plantImageMap[plantName] || 'https://via.placeholder.com/40';
                    img.alt = plantName;
                    img.style.width = '40px';
                    img.style.height = '40px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '4px';
                    img.style.boxShadow = '0 1px 3px rgb(0 0 0 / 0.1)';
                    img.style.marginRight = '10px';

                    const nameSpan = document.createElement('span');
                    nameSpan.textContent = plantName;
                    nameSpan.style.marginRight = '10px';

                    const priceSpan = document.createElement('span');
                    priceSpan.textContent = plantPriceMap[plantName] ? `₹${plantPriceMap[plantName]}` : 'Price Unknown';

                    plantDiv.appendChild(img);
                    plantDiv.appendChild(nameSpan);
                    plantDiv.appendChild(priceSpan);
                    bundleContainer.appendChild(plantDiv);
                });

                info.appendChild(bundleContainer);
            } else {
                const img = document.createElement('img');
                img.src = plantImageMap[order.plantName] || order.image || 'https://via.placeholder.com/80';
                img.alt = order.plantName || 'Product Image';
                info.appendChild(img);
            }

            const details = document.createElement('div');
            details.className = 'order-details';

            const productName = document.createElement('div');
            productName.className = 'product-name';
            productName.textContent = order.plantName || 'Unknown Product';
            details.appendChild(productName);

            const price = document.createElement('div');
            price.className = 'price';
            price.textContent = order.totalPrice ? `${order.totalPrice}` : 'Price Unknown';
            details.appendChild(price);

            // Removed the "Bundle includes:" section and images here

            info.appendChild(details);
            content.appendChild(info);

            const statusDiv = document.createElement('div');
            statusDiv.className = 'order-status';

            const statusText = document.createElement('div');
            statusText.className = 'status-text';
            // Do not display 'in transit' text
            if (order.status && order.status.toLowerCase() === 'in transit') {
                statusText.textContent = '';
            } else {
                statusText.textContent = order.status || 'Status Unknown';
            }

            if (order.status) {
                if (order.status.toLowerCase() === 'in transit') {
                    statusText.classList.add('status-in-transit');
                } else if (order.status.toLowerCase() === 'completed') {
                    statusText.classList.add('status-completed');
                } else if (order.status.toLowerCase() === 'cancelled') {
                    statusText.classList.add('status-cancelled');
                }
            }
            statusDiv.appendChild(statusText);

            if (order.statusDetails) {
                const statusDetails = document.createElement('div');
                statusDetails.textContent = order.statusDetails;
                statusDiv.appendChild(statusDetails);
            }
            content.appendChild(statusDiv);

            const actions = document.createElement('div');
            actions.className = 'order-actions';

            // Remove 'Track order' button but keep 'Request return' button for 'in transit' status
            if (order.status && order.status.toLowerCase() === 'in transit') {
                const returnBtn = document.createElement('button');
                returnBtn.className = 'btn btn-secondary';
                returnBtn.textContent = 'Request return';
                returnBtn.onclick = () => showToast('Return requested.');
                actions.appendChild(returnBtn);
            }

            // Add delete button for all orders
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-secondary';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                showDeleteConfirmationToast(index);
            };

            actions.appendChild(deleteBtn);

            content.appendChild(actions);
            card.appendChild(content);

            const summary = document.createElement('div');
            summary.className = 'order-summary';
            summary.innerHTML = 
                'Total ' + (order.totalPrice ? order.totalPrice : 'Unknown') + '<br/>' +
                'Paid with ' + (order.paymentOption || 'Unknown');
            card.appendChild(summary);

            container.appendChild(card);
        });
    }

    function deleteOrder(index) {
        const orders = getOrders();
        orders.splice(index, 1);
        saveOrders(orders);
        renderOrders();
    }

    // Function to show delete confirmation toast
    function showDeleteConfirmationToast(orderIndex) {
        let toast = document.createElement('div');
        toast.className = 'toast-message confirmation-toast';

        const message = document.createElement('span');
        message.textContent = 'Are you sure you want to delete this order? ';
        toast.appendChild(message);

        const yesBtn = document.createElement('button');
        yesBtn.textContent = 'Yes';
        yesBtn.className = 'btn btn-primary btn-sm';
        yesBtn.style.marginLeft = '10px';
        yesBtn.onclick = () => {
            deleteOrder(orderIndex);
            document.body.removeChild(toast);
            showToast('Order deleted.');
        };
        toast.appendChild(yesBtn);

        const noBtn = document.createElement('button');
        noBtn.textContent = 'No';
        noBtn.className = 'btn btn-secondary btn-sm';
        noBtn.style.marginLeft = '5px';
        noBtn.onclick = () => {
            document.body.removeChild(toast);
        };
        toast.appendChild(noBtn);

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
    }

    // Initial render
    renderOrders();

    function removeOrderByNumber(orderNumber) {
        const orders = getOrders();
        const index = orders.findIndex(o => o.orderNumber === orderNumber);
        if (index !== -1) {
            orders.splice(index, 1);
            saveOrders(orders);
            renderOrders();
        }
    }

    // Removed forced removal of specific order to keep all orders intact
    // removeOrderByNumber('1750925608079');

    // Removed filterOrders function and usage to show all orders including 'Multiple Items'
    // function filterOrders(orders) {
    //     return orders.filter(order => order.plantName !== 'Multiple Items');
    // }

    // Expose addOrder function globally for adding orders from other pages if needed
    window.addOrder = function(order) {
        const orders = getOrders();
        // Check if order with same orderNumber already exists
        const exists = orders.some(o => o.orderNumber === order.orderNumber);
        if (!exists) {
            orders.push(order);
            saveOrders(orders);
            renderOrders();
        }
    };
});
