document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    
    // Элементы DOM
    const buyButtons = document.querySelectorAll('.buy-button');
    const cartCount = document.getElementById('cart-count');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartContentWrapper = document.getElementById('cart-content-wrapper');
    const cartItemsList = document.getElementById('cart-items-list');
    const totalSumEl = document.getElementById('total-sum');
    const orderForm = document.getElementById('shop-form');
    const submitBtn = document.getElementById('submit-btn');
    
    const hiddenProducts = document.getElementById('hidden-products');
    const hiddenTotal = document.getElementById('hidden-total');
    
    const historyEmpty = document.getElementById('history-empty');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    renderHistory();

    // 1. Добавление товара в корзину
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-product');
            const price = parseInt(button.getAttribute('data-price'));
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCartUI();
            
            const originalText = button.textContent;
            button.textContent = "Добавлено! ✓";
            button.style.background = "#3498db";
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = "#2ecc71";
            }, 800);
        });
    });

    // 2. Обновление интерфейса корзины
    function updateCartUI() {
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

        totalSumEl.textContent = totalSum.toLocaleString('ru-RU');

        // Записываем данные в скрытые поля HTML-формы для отправки на почту
        if(hiddenProducts) hiddenProducts.value = cart.map(item => `${item.name} (${item.quantity} шт.)`).join(', ');
        if(hiddenTotal) hiddenTotal.value = totalSum + " руб.";

        // Кнопки внутри корзины
        cartItemsList.querySelectorAll('.plus').forEach(btn => btn.addEventListener('click', (e) => {
            cart[e.target.getAttribute('data-index')].quantity += 1;
            updateCartUI();
        }));

        cartItemsList.querySelectorAll('.minus').forEach(btn => btn.addEventListener('click', (e) => {
            const idx = e.target.getAttribute('data-index');
            if (cart[idx].quantity > 1) {
                cart[idx].quantity -= 1;
            } else {
                cart.splice(idx, 1);
            }
            updateCartUI();
        }));

        cartItemsList.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', (e) => {
            cart.splice(e.target.getAttribute('data-index'), 1);
            updateCartUI();
        }));
    }

    // 3. Сохранение в локальную историю при клике на отправку формы
    if (orderForm) {
        orderForm.addEventListener('submit', () => {
            const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const orderProductsText = cart.map(item => `${item.name} (${item.quantity}шт.)`).join(', ');

            const newOrder = {
                id: Math.floor(Math.random() * 100000),
                date: new Date().toLocaleString('ru-RU'),
                products: orderProductsText,
                totalPrice: totalSum
            };

            let history = JSON.parse(localStorage.getItem('shop_history')) || [];
            history.unshift(newOrder);
            localStorage.setItem('shop_history', JSON.stringify(history));
            
            // Корзина очистится автоматически после перезагрузки формы сервисом Formspree
        });
    }

    function renderHistory() {
        const history = JSON.parse(localStorage.getItem('shop_history')) || [];
        if (!historyList) return;
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
                <div style="margin-top: 0.5rem; text-align: right; font-weight: bold; color: #2ecc71;">Сумма: ${order.totalPrice.toLocaleString('ru-RU')} руб.</div>
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
