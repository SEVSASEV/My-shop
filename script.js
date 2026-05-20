// ==========================================
// НАСТРОЙКА FORMSPREE
// Вставьте сюда вашу скопированную ссылку вместо заглушки:
const FORMSPREE_URL = "https://formspree.io/f/mrededyy"; 
// ==========================================

// Функция генерации графических карточек прямо в браузере (Data URL)
// Исключает ошибки CORS, ERR_FILE_NOT_FOUND и не требует наличия папки img
const createPlaceholderSvg = (text, categoryText, bgColor) => {
    const svg = `<svg xmlns="http://w3.org" width="400" height="300" viewBox="0 0 400 300">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        <!-- Декоративный полупрозрачный круг на фоне -->
        <circle cx="300" cy="220" r="100" fill="#ffffff" opacity="0.1"/>
        <circle cx="80" cy="60" r="50" fill="#ffffff" opacity="0.05"/>
        <!-- Категория товара мелким шрифтом -->
        <text x="30" y="50" font-family="Segoe UI, sans-serif" font-size="14" font-weight="600" fill="#ffffff" opacity="0.7" letter-spacing="1">${categoryText.toUpperCase()}</text>
        <!-- Название конкретного товара по центру -->
        <text x="30" y="160" font-family="Segoe UI, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">${text}</text>
        <!-- Декоративная линия -->
        <line x1="30" y1="185" x2="100" y2="185" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.9"/>
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
};

// 1. Ваши базовые товары (12 шт) с автогенерируемыми картинками, чтобы не зависеть от локальных файлов
const BASE_PRODUCTS = [
    { id: 1, name: "Наушники Premium", price: 3000, category: "gadgets", img: createPlaceholderSvg("Наушники Bass+", "Гаджеты", "#34495e"), description: "Полноразмерные беспроводные наушники с глубоким басом.", specs: { "Время работы": "до 40 часов", "Цвет": "Черный" } },
    { id: 2, name: "Подписка Telegram Premium", price: 2000, category: "services", img: createPlaceholderSvg("Telegram Premium", "Услуги", "#0088cc"), description: "Официальная подписка на 12 месяцев.", specs: { "Срок действия": "12 месяцев", "Тип": "Gift" } },
    { id: 3, name: "Чайник Electric", price: 1500, category: "appliances", img: createPlaceholderSvg("Стальной Чайник", "Техника", "#7f8c8d"), description: "Стильный электрический чайник из стали.", specs: { "Объем": "1.7 л", "Мощность": "2200 Вт" } },
    { id: 4, name: "iPhone 15 Pro Max Super", price: 45000, category: "gadgets", img: createPlaceholderSvg("iPhone 15 Pro", "Гаджеты", "#2c3e50"), description: "Флагманский smartphone в титановом корпусе.", specs: { "Экран": "6.7 дюйма", "Память": "256 ГБ" } },
    { id: 5, name: "Умные часы Sport Watch", price: 5500, category: "gadgets", img: createPlaceholderSvg("Sport Watch v2", "Гаджеты", "#16a085"), description: "Современные смарт-часы с AMOLED-экраном.", specs: { "Экран": "1.43 дюйма", "Автономность": "14 дней" } },
    { id: 6, name: "Робот-пылесос CleanBot", price: 14000, category: "appliances", img: createPlaceholderSvg("Робот CleanBot", "Техника", "#2980b9"), description: "Робот-пылесос для сухой и влажной уборки.", specs: { "Мощность": "4000 Па", "Навигация": "LiDAR" } },
    { id: 7, name: "Капсульная кофемашина", price: 8900, category: "appliances", img: createPlaceholderSvg("Кофемашина", "Техника", "#c0392b"), description: "Компактная кофемашина для быстрого эспрессо.", specs: { "Давление": "19 бар", "Объем": "0.8 л" } },
    { id: 8, name: "Игровая приставка NextGen", price: 52000, category: "gadgets", img: createPlaceholderSvg("NextGen Console", "Гаджеты", "#272727"), description: "Игровая консоль нового поколения с поддержкой 4K.", specs: { "Накопитель": "1 ТБ SSD", "Разрешение": "4K UHD" } },
    { id: 9, name: "Курс по веб-разработке PRO", price: 15000, category: "services", img: createPlaceholderSvg("Курс Web-PRO", "Услуги", "#8e44ad"), description: "Полный онлайн-курс по созданию сайтов с нуля.", specs: { "Формат": "Практика", "Длительность": "6 месяцев" } },
    { id: 10, name: "Вертикальный отпариватель", price: 4200, category: "appliances", img: createPlaceholderSvg("Отпариватель", "Техника", "#d35400"), description: "Мощный ручной отпариватель для одежды.", specs: { "Подача пара": "30 г/мин", "Мощность": "1600 Вт" } },
    { id: 11, name: "Портативная колонка Boom", price: 2500, category: "gadgets", img: createPlaceholderSvg("Колонка Boom", "Гаджеты", "#d35400"), description: "Беспроводная колонка с защитой от воды IPX7.", specs: { "Мощность": "20 Вт", "Автономность": "12 часов" } },
    { id: 12, name: "Консультация IT-специалиста", price: 3500, category: "services", img: createPlaceholderSvg("IT Консультация", "Услуги", "#2c3e50"), description: "Часовая индивидуальная сессия с разработчиком.", specs: { "Длительность": "60 мин", "Платформа": "Zoom" } }
];

// 2. Генератор дополнительных 90 товаров (Каждый получает уникальный сгенерированный рисунок)
const generateExtraProducts = () => {
    const extra = [];
    let currentId = 13;

    const clothingTypes = ["Худи Premium", "Футболка Streetwear", "Джинсы Slim", "Кроссовки Run", "Куртка Urban", "Свитшот Casual", "Кепка Sport", "Спортивные штаны", "Носки Cotton", "Рюкзак Tech"];
    const brands = ["Streetwear", "Спорт-Плюс", "Urban Style", "EcoCotton", "TechWear"];
    const colors = ["Черный", "Белый", "Оверсайз Серый", "Бежевый", "Темно-зеленый"];

    const gameGenres = ["RPG Quest", "Racing Simulator", "Action Shooter", "Strategy War", "Cyber Horror", "Survival Island", "Sports Football"];
    const platforms = ["PC / PlayStation 5", "Xbox Series X", "Nintendo Switch", "PC Digital"];

    const toyTypes = ["Конструктор Блоки", "Плюшевый мишка", "Радиоуправляемая машина", "Настольная игра", "Коллекционная фигурка", "Пазл Сложный", "Развивающий набор"];
    const materials = ["Гипоаллергенный пластик", "Эко-дерево", "Мягкий плюш", "Плотный картон"];

    // Палитры цветов для категорий
    const clothesColors = ["#4a148c", "#6a1b9a", "#7b1fa2", "#8e24aa", "#9c27b0"];
    const gamesColors = ["#0d47a1", "#1565c0", "#1976d2", "#1e88e5", "#2196f3"];
    const toysColors = ["#e65100", "#ef6c00", "#f57c00", "#fb8c00", "#ff9800"];

    // Одежда (30 товаров)
    for (let i = 1; i <= 30; i++) {
        const type = clothingTypes[i % clothingTypes.length];
        const brand = brands[i % brands.length];
        const colorName = `${type} #${i}`;
        const colorHex = clothesColors[i % clothesColors.length];

        extra.push({
            id: currentId++,
            name: `${type} ${brand} #${i}`,
            price: 1200 + (i * 130),
            category: "clothes",
            img: createPlaceholderSvg(colorName, "👔 Одежда и обувь", colorHex),
            description: `Стильный элемент гардероба от бренда ${brand}. Изготовлен из качественных дышащих материалов.`,
            specs: { "Материал": "Хлопок / Полиэстер", "Цвет": colors[i % colors.length], "Размеры": "S, M, L, XL" }
        });
    }

    // Игры (30 товаров)
    for (let i = 1; i <= 30; i++) {
        const genre = gameGenres[i % gameGenres.length];
        const colorHex = gamesColors[i % gamesColors.length];

        extra.push({
            id: currentId++,
            name: `Игра: ${genre} Часть ${i}`,
            price: 1990 + (i * 100),
            category: "games",
            img: createPlaceholderSvg(`Gamer Edition ${i}`, "🎮 Видеоигры", colorHex),
            description: `Захватывающая видеоигра в жанре ${genre.toLowerCase()}. Отличная графика и сюжет.`,
            specs: { "Жанр": genre, "Платформа": platforms[i % platforms.length], "Язык": "Русский" }
        });
    }

    // Игрушки (30 товаров)
    for (let i = 1; i <= 30; i++) {
        const type = toyTypes[i % toyTypes.length];
        const colorHex = toysColors[i % toysColors.length];

        extra.push({
            id: currentId++,
            name: `${type} "${i}-й Век"`,
            price: 800 + (i * 90),
            category: "toys",
            img: createPlaceholderSvg(type, "🧸 Игрушки / Хобби", colorHex),
            description: `Прекрасный развивающий выбор для подарка: ${type.toLowerCase()}.`,
            specs: { "Тип": type, "Материал": materials[i % materials.length], "Возраст": "от 3-х лет" }
        });
    }

    return extra;
};

// Объединяем в единую базу (Итого 102 товара)
const PRODUCTS_DATABASE = [...BASE_PRODUCTS, ...generateExtraProducts()];

document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    let isDiscountApplied = false;
    
    // Элементы DOM
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

    // Элементы Модального Окна
    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalSpecsList = document.getElementById('modal-specs-list');
    const modalBuyBtn = document.getElementById('modal-buy-btn');

    // Инициализация
    renderProducts(PRODUCTS_DATABASE);
    renderHistory();

    // Отрисовка каталога
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
            card.style.setProperty('--delay', index % 10);
            
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

        // Кнопки добавления
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

        // Клики для модалки
        productsGrid.querySelectorAll('.view-details-trigger, .details-button').forEach(el => {
            el.addEventListener('click', () => {
                const pId = parseInt(el.getAttribute('data-id'));
                const product = PRODUCTS_DATABASE.find(p => p.id === pId);
                openProductModal(product);
            });
        });
    }

    // Модальное окно
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

    // Поиск и фильтры
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

    // Корзина
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

    // Промокод
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

    // Отправка формы
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

    // История
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
