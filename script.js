// ==========================================
// НАСТРОЙКА TELEGRAM БОТА
const TG_BOT_TOKEN = "8701859414:AAEPSK4tgRxgZ9YCGdnQOfjR9whuQFfpyJM"; 
const TG_CHAT_ID = "2084519118"; 
// ==========================================

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
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.getElementById('order-progress');
    
    const historyEmpty = document.getElementById('history-empty');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    renderHistory();

    // 1. Добавление товара в корзину из HTML таблицы
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
                <div>
                    <strong>${item.name}</strong> — ${item.price} руб. x ${item.quantity}
                </div>
                <div class="cart-item-actions">
                    <button type="button" class="quantity-btn minus" data-index="${index}">-</button>
                    <button type="button" class="quantity-btn plus" data-index="${index}">+</button>
                    <button type="button" class="delete-btn" data-index="${index}">Удалить</button>
                </div>
            `;
            cartItemsList.appendChild(li);
        });

        totalSumEl.textContent = totalSum.toLocaleString('ru-RU');

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

    // 3. Отправка заказа НАПРЯМУЮ в Telegram
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const clientName = document.getElementById('name').value.trim();
        const clientEmail = document.getElementById('email').value.trim();
        const clientComment = document.getElementById('comment').value.trim();
        
        const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Красиво форматируем текст сообщения для Telegram
        let messageText = `🛍 *НОВЫЙ ЗАКАЗ НА САЙТЕ!*\n\n`;
        messageText += `👤 *Клиент:* ${clientName}\n`;
        messageText += `📧 *Email:* ${clientEmail}\n`;
        messageText += `🏠 *Адрес/Комментарий:* ${clientComment}\n\n`;
        messageText += `📦 *Товары:* \n`;
        
        cart.forEach(item => {
            messageText += `• ${item.name} (${item.quantity} шт.) — ${item.price * item.quantity} руб.\n`;
        });
        
        messageText += `\n💰 *Итого к оплате:* ${totalSum} руб.`;

        submitBtn.disabled = true;
        progressContainer.style.display = 'block';
        progressBar.value = 50;

        // URL для отправки запроса к API Telegram
        const url = `https://telegram.org{TG_BOT_TOKEN}/sendMessage`;

        // Отправка данных методом POST
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TG_CHAT_ID,
                text: messageText,
                parse_mode: "Markdown" // Позволяет делать текст жирным
            })
        })
        .then(response => {
            if (response.ok) {
                progressBar.value = 100;
                finalizeOrder(clientName, cart.map(item => `${item.name} (${item.quantity}шт.)`).join(', '), totalSum);
            } else {
                throw new Error();
            }
        })
        .catch(() => {
            alert("Ошибка связи с ботом. Заказ сохранен только локально.");
            finalizeOrder(clientName, cart.map(item => `${item.name} (${item.quantity}шт.)`).join(', '), totalSum);
        });
    });

    function finalizeOrder(name, productsText, total) {
        const newOrder = {
            id: Math.floor(Math.random() * 100000),
            date: new Date().toLocaleString('ru-RU'),
            products: productsText,
            totalPrice: total
        };

        let history = JSON.parse(localStorage.getItem('shop_history')) || [];
        history.unshift(newOrder);
        localStorage.setItem('shop_history', JSON.stringify(history));

        alert(`Заказ успешно оформлен!\nУведомление отправлено в Telegram.`);
        
        cart = [];
        updateCartUI();
        orderForm.reset();
        progressContainer.style.display = 'none';
        renderHistory();
    }

    function renderHistory() {
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
                <div class="history-header">
                    <span>Заказ №${order.id}</span>
                    <span>${order.date}</span>
                </div>
                <div><strong>Товары:</strong> ${order.products}</div>
                <div style="margin-top: 0.5rem; text-align: right; font-weight: bold; color: #2ecc71;">
                    Сумма: ${order.totalPrice.toLocaleString('ru-RU')} руб.
                </div>
            `;
            historyList.appendChild(card);
        });
    }

    clearHistoryBtn.addEventListener('click', () => {
        if(confirm("Вы уверены, что хотите очистить всю историю заказов?")) {
            localStorage.removeItem('shop_history');
            renderHistory();
        }
    });
});
