// ==========================================
// НАСТРОЙКА FORMSPREE
// Вставьте сюда вашу скопированную ссылку вместо заглушки:
const FORMSPREE_URL = "https://formspree.io/f/mrededyy"; 
// ==========================================

// Функция генерации графических обложек прямо в браузере (Data URL)
const createPlaceholderSvg = (text, categoryText, bgColor) => {
    const svg = `<svg xmlns="http://w3.org" width="400" height="300" viewBox="0 0 400 300">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        <circle cx="300" cy="220" r="100" fill="#ffffff" opacity="0.1"/>
        <text x="30" y="50" font-family="Segoe UI, sans-serif" font-size="14" font-weight="600" fill="#ffffff" opacity="0.7" letter-spacing="1">${categoryText.toUpperCase()}</text>
        <text x="30" y="160" font-family="Segoe UI, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">${text}</text>
        <line x1="30" y1="185" x2="100" y2="185" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.9"/>
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
};

// База данных строго из 4 основных товаров
const PRODUCTS_DATABASE = [
    { 
        id: 1, 
        name: "Наушники", 
        price: 3000, 
        category: "gadgets", 
        img: createPlaceholderSvg("Наушники Bass+", "Гаджеты", "#34495e"), 
        description: "Полноразмерные беспроводные наушники с глубоким басом и активным шумоподавлением. Идеально подходят для путешествий, работы в офисе и занятий спортом.", 
        specs: { "Время работы": "до 40 часов", "Цвет": "Черный", "Подключение": "Bluetooth 5.2" } 
    },
    { 
        id: 2, 
        name: "Подписка Telegram Premium", 
        price: 2000, 
        category: "services", 
        img: createPlaceholderSvg("Telegram Premium", "Услуги", "#0088cc"), 
        description: "Официальная подписка на 12 месяцев. Открывает доступ к эксклюзивным функциям, удвоенным лимитам и уникальным стикерам.", 
        specs: { "Срок действия": "12 месяцев", "Тип": "Gift", "Скорость": "Максимальная" } 
    },
    { 
        id: 3, 
        name: "Чайник", 
        price: 1500, 
        category: "appliances", 
        img: createPlaceholderSvg("Стальной Чайник", "Техника", "#7f8c8d"), 
        description: "Стильный электрический чайник из нержавеющей стали с функцией выбора температуры и защиты от включения без воды.", 
        specs: { "Объем": "1.7 л", "Мощность": "2200 Вт", "Материал": "Сталь" } 
    },
    { 
        id: 4, 
        name: "iPhone 15 Pro Max Super", 
        price: 45000, 
        category: "gadgets", 
        img: createPlaceholderSvg("iPhone 15 Pro", "Гаджеты", "#2c3e50"), 
        description: "Флагманский смартфон в титановом корпусе. Оснащен мощнейшим процессором A17 Pro и передовой системой камер.", 
        specs: { "Экран": "6.7 дюйма", "Память": "256 ГБ", "Корпус": "Титан" } 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    let isDiscountApplied = false;
    
    const productsGrid = document.getElementById('products-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    
    const cartCount = document.getElementById('cart-count');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartContentWrapper = document.getElementById('cart-content-wrapper');
    const cartItemsList = document.getElementById('cart-items-list');
    const totalSumEl = document.getElementById('total-sum');
    
    const promoInput = document.getElementById('promo-input');
    const applyPromoBtn = document.getElementById('apply-promo-btn');
    const discountLabel = document.getElementById('discount-label');
    
    const orderForm = document.getElementById('shop-form');
    const submitBtn = document.getElementById('submit-btn');
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.getElementById('order-progress');
    
    const historyEmpty = document.getElementById('history-empty');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalSpecsList = document.getElementById('modal-specs-list');
    const modalBuyBtn = document.getElementById('modal-buy-btn');

    renderProducts(PRODUCTS_DATABASE);
    renderHistory();

    function renderProducts(products) {
        if (!productsGrid) return;
        productsGrid.innerHTML = '';
        if(products.length === 0) {
            productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#7f8c8d;">Товары не найдены</p>';
            return;
        }
        
        products.forEach((prod, index) => {
            const card = document.createElement('div');
            card.className = 'product-card animate-card';
            card.style.setProperty('--delay', index);
            
            card.innerHTML = `
                <img src="${prod.img}" alt="${prod.name}" class="view-details-trigger" data-id="${prod.id}" style="cursor:pointer;">
                <div>
                    <h4 class="view-details-trigger" data-id="${prod.id}" style="cursor:pointer;">${prod.name}</h4>
                    <div class="price">${prod.price.toLocaleString('ru-RU')} руб.</div>
                </div>
                <div style="display:flex; gap:0.5rem;">
                    <button type="button" class="details-button" data-id="${prod.id}">Инфо</button>
                    <button type="button" class="buy-button" data-id="${prod.id}">В корзину</button>
                </div>
            `;
            productsGrid.appendChild(card);
        });

        productsGrid.querySelectorAll('.buy-button').forEach(btn => {
            btn.addEventListener('click', () => {
                const pId = parseInt(btn.getAttribute('data-id'));
                const product = PRODUCTS_DATABASE.find(p => p.id === pId);
                addToCart(product);
                
                btn.textContent = "Добавлено! ✓";
                btn.style.background = "#3498db";
                setTimeout(() => { btn.textContent = "В корзину"; btn.style.background = "#2ecc71"; }, 800);
            });
        });

        productsGrid.querySelectorAll('.view-details-trigger, .details-button').forEach(el => {
            el.addEventListener('click', () => {
                const pId = parseInt(el.getAttribute('data-id'));
                const product = PRODUCTS_DATABASE.find(p => p.id === pId);
                openProductModal(product);
            });
        });
    }

    function openProductModal(product) {
        if (!modal) return;
        modalImg.src = product.img;
        modalTitle.textContent = product.name;
        modalDesc.textContent = product.description;
        
        modalSpecsList.innerHTML = '';
        for (const [key, value] of Object.entries(product.specs)) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${key}:</strong> ${value}`;
            modalSpecsList.appendChild(li);
        }

        modalBuyBtn.setAttribute('data-id', product.id);
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (modalBuyBtn) {
        modalBuyBtn.addEventListener('click', () => {
            const pId = parseInt(modalBuyBtn.getAttribute('data-id'));
            const product = PRODUCTS_DATABASE.find(p => p.id === pId);
            addToCart(product);
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    function filterCatalog() {
        const searchText = searchInput.value.toLowerCase().trim();
        const selectedCat = categoryFilter.value;

        const filtered = PRODUCTS_DATABASE.filter(prod => {
            const matchesSearch = prod.name.toLowerCase().includes(searchText);
            const matchesCategory = (selectedCat === 'all' || prod.category === selectedCat);
            return matchesSearch && matchesCategory;
        });

        renderProducts(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', filterCatalog);
    if (categoryFilter) categoryFilter.addEventListener('change', filterCatalog);

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartUI();
    }

    function updateCartUI() {
        if (!cartCount) return;
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        if (cart.length === 0) {
            cartEmptyMessage.style.display = 'block';
            cartContentWrapper.style.display = 'none';
            submitBtn.disabled = true;
            submitBtn.textContent = "Сначала добавьте товары в корзину";
            return;
        }

        cartEmptyMessage.style.display = 'none';
        cartContentWrapper.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = "Оформить заказ";

        cartItemsList.innerHTML = '';
        let totalSum = 0;

        cart.forEach((item, index) => {
            const itemCost = item.price * item.quantity;
            totalSum += itemCost;

            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div><strong>${item.name}</strong> — ${item.price} руб. x ${item.quantity}</div>
                <div class="cart-item-actions">
                    <button type="button" class="quantity-btn minus" data-index="${index}">-</button>
                    <button type="button" class="quantity-btn plus" data-index="${index}">+</button>
                    <button type="button" class="delete-btn" data-index="${index}">Удалить</button>
                </div>
            `;
            cartItemsList.appendChild(li);
        });

        if (isDiscountApplied) {
            totalSum = totalSum * 0.9;
            discountLabel.style.display = 'inline';
        } else {
            discountLabel.style.display = 'none';
        }

        totalSumEl.textContent = Math.round(totalSum).toLocaleString('ru-RU');

        cartItemsList.querySelectorAll('.plus').forEach(btn => btn.addEventListener('click', (e) => {
            cart[e.target.getAttribute('data-index')].quantity += 1;
            updateCartUI();
        }));

        cartItemsList.querySelectorAll('.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                if (cart[idx].quantity > 1) cart[idx].quantity -= 1;
                else cart.splice(idx, 1);
                updateCartUI();
            });
        });

        cartItemsList.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                cart.splice(e.target.getAttribute('data-index'), 1);
                updateCartUI();
            });
        });
    }

    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', () => {
            if (promoInput.value.trim().toUpperCase() === "SALE10") {
                isDiscountApplied = true;
                alert("Скидка 10% активирована!");
                updateCartUI();
            } else {
                alert("Неверный промокод!");
            }
            promoInput.value = '';
        });
    }

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const clientName = document.getElementById('name').value.trim();
            const clientEmail = document.getElementById('email').value.trim();
            const clientComment = document.getElementById('comment').value.trim();
            
            let totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (isDiscountApplied) totalSum = totalSum * 0.9;

            const orderProductsText = cart.map(item => `${item.name} (${item.quantity}шт.)`).join(', ');

            submitBtn.disabled = true;
            progressContainer.style.display = 'block';
            progressBar.value = 30;

            if (FORMSPREE_URL.includes("ВАШ_ID_ФОРМЫ") || FORMSPREE_URL.includes("test")) {
                progressBar.value = 100;
                setTimeout(() => { finalizeOrder(clientName, orderProductsText, totalSum); }, 500);
                return;
            }

            const formData = {
                "Имя клиента": clientName,
                "Email для связи": clientEmail,
                "Состав заказа": orderProductsText,
                "Итоговая сумма": Math.round(totalSum) + " руб.",
                "Промокод": isDiscountApplied ? "SALE10" : "Нет",
                "Адрес доставки": clientComment
            };

            progressBar.value = 60;

            fetch(FORMSPREE_URL, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            })
            .then(res => {
                if (res.ok) {
                    progressBar.value = 100;
                    finalizeOrder(clientName, orderProductsText, totalSum);
                } else { throw new Error(); }
            })
            .catch(() => {
                alert("Ошибка отправки. Заказ сохранен локально.");
                finalizeOrder(clientName, orderProductsText, totalSum);
            });
        });
    }

    function finalizeOrder(name, productsText, total) {
        const newOrder = {
            id: Math.floor(Math.random() * 100000),
            date: new Date().toLocaleString('ru-RU'),
            products: productsText,
            totalPrice: Math.round(total)
        };

        let history = JSON.parse(localStorage.getItem('shop_history')) || [];
        history.unshift(newOrder);
        localStorage.setItem('shop_history', JSON.stringify(history));

        alert(`Заказ оформлен!\nСумма: ${Math.round(total)} руб.`);
        
        cart = [];
        isDiscountApplied = false;
        updateCartUI();
        orderForm.reset();
        progressContainer.style.display = 'none';
        renderHistory();
    }

    function renderHistory() {
        if (!historyList) return;
        const history = JSON.parse(localStorage.getItem('shop_history')) || [];
        if (history.length === 0) {
            historyEmpty.style.display = 'block';
            historyList.innerHTML = '';
            clearHistoryBtn.style.display = 'none';
            return;
        }

        historyEmpty.style.display = 'none';
        clearHistoryBtn.style.display = 'block';
        historyList.innerHTML = '';

        history.forEach(order => {
            const card = document.createElement('div');
            card.className = 'history-card';
            card.innerHTML = `
                <div class="history-header"><span>Заказ №${order.id}</span><span>${order.date}</span></div>
                <div><strong>Товары:</strong> ${order.products}</div>
                <div style="margin-top:0.5rem; text-align:right; font-weight:bold; color:#2ecc71;">Сумма: ${order.totalPrice} руб.</div>
            `;
            historyList.appendChild(card);
        });
    }

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            if(confirm("Очистить историю?")) {
                localStorage.removeItem('shop_history');
                renderHistory();
            }
        });
    }
});
