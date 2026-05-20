// ==========================================
// НАСТРОЙКА FORMSPREE
// Вставьте сюда вашу скопированную ссылку вместо заглушки:
const FORMSPREE_URL = "https://formspree.io/f/mrededyy"; 
// ==========================================

// 1. Ваши базовые товары (12 шт)
const BASE_PRODUCTS = [
    { id: 1, name: "Наушники", price: 3000, category: "gadgets", img: "img/headphones.jpg", description: "Полноразмерные беспроводные наушники с глубоким басом.", specs: { "Время работы": "до 40 часов", "Цвет": "Черный" } },
    { id: 2, name: "Подписка Telegram Premium", price: 2000, category: "services", img: "img/tg.jpg", description: "Официальная подписка на 12 месяцев.", specs: { "Срок действия": "12 месяцев", "Тип": "Gift" } },
    { id: 3, name: "Чайник", price: 1500, category: "appliances", img: "img/kettle.jpg", description: "Стильный электрический чайник из стали.", specs: { "Объем": "1.7 л", "Мощность": "2200 Вт" } },
    { id: 4, name: "iPhone 15 Pro Max Super", price: 45000, category: "gadgets", img: "img/iphone.jpg", description: "Флагманский смартфон в титановом корпусе.", specs: { "Экран": "6.7 дюйма", "Память": "256 ГБ" } },
    { id: 5, name: "Умные часы Sport Watch", price: 5500, category: "gadgets", img: "img/watch.jpg", description: "Современные смарт-часы с AMOLED-экраном.", specs: { "Экран": "1.43 дюйма", "Автономность": "14 дней" } },
    { id: 6, name: "Робот-пылесос CleanBot", price: 14000, category: "appliances", img: "img/vacuum.jpg", description: "Робот-пылесос для сухой и влажной уборки.", specs: { "Мощность": "4000 Па", "Навигация": "LiDAR" } },
    { id: 7, name: "Капсульная кофемашина", price: 8900, category: "appliances", img: "img/coffee.jpg", description: "Компактная кофемашина для быстрого эспрессо.", specs: { "Давление": "19 бар", "Объем": "0.8 л" } },
    { id: 8, name: "Игровая приставка NextGen", price: 52000, category: "gadgets", img: "img/console.jpg", description: "Игровая консоль нового поколения с поддержкой 4K.", specs: { "Накопитель": "1 ТБ SSD", "Разрешение": "4K UHD" } },
    { id: 9, name: "Курс по веб-разработке PRO", price: 15000, category: "services", img: "img/course.jpg", description: "Полный онлайн-курс по созданию сайтов с нуля.", specs: { "Формат": "Практика", "Длительность": "6 месяцев" } },
    { id: 10, name: "Вертикальный отпариватель", price: 4200, category: "appliances", img: "img/steamer.jpg", description: "Мощный ручной отпариватель для одежды.", specs: { "Подача пара": "30 г/мин", "Мощность": "1600 Вт" } },
    { id: 11, name: "Портативная колонка Boom", price: 2500, category: "gadgets", img: "img/speaker.jpg", description: "Беспроводная колонка с защитой от воды IPX7.", specs: { "Мощность": "20 Вт", "Автономность": "12 часов" } },
    { id: 12, name: "Консультация IT-специалиста", price: 3500, category: "services", img: "img/consult.jpg", description: "Часовая индивидуальная сессия с разработчиком.", specs: { "Длительность": "60 мин", "Платформа": "Zoom" } }
];

// 2. Генератор дополнительных 90 товаров (Одежда, Игры, Игрушки)
const generateExtraProducts = () => {
    const extra = [];
    let currentId = 13;

    // Шаблоны для генерации одежды
    const clothingTypes = ["Худи", "Футболка", "Джинсы", "Кроссовки", "Куртка", "Свитшот", "Кепка", "Спортивные штаны", "Носки Premium", "Рюкзак"];
    const brands = ["Streetwear", "Спорт-Плюс", "Urban Style", "EcoCotton", "TechWear"];
    const colors = ["Черный", "Белый", "Оверсайз Серый", "Бежевый", "Темно-зеленый"];

    // Шаблоны для генерации игр
    const gameGenres = ["RPG Quest", "Racing Simulator", "Action Shooter", "Strategy War", "Cyber Horror", "Survival Island", "Sports Football"];
    const platforms = ["PC / PlayStation 5", "Xbox Series X", "Nintendo Switch", "PC Digital"];

    // Шаблоны для генерации игрушек
    const toyTypes = ["Конструктор", "Плюшевый мишка", "Радиоуправляемая машина", "Настольная игра", "Коллекционная фигурка", "Пазл", "Развивающий набор"];
    const materials = ["Гипоаллергенный пластик", "Эко-дерево", "Мягкий плюш", "Плотный картон"];

    // Генерируем 30 товаров Одежды
    for (let i = 1; i <= 30; i++) {
        const type = clothingTypes[i % clothingTypes.length];
        const brand = brands[i % brands.length];
        const color = colors[i % colors.length];
        extra.push({
            id: currentId++,
            name: `${type} ${brand} #${i}`,
            price: 1200 + (i * 130),
            category: "clothes",
            img: "img/clothes.jpg",
            description: `Стильный элемент гардероба: ${type.toLowerCase()} от бренда ${brand}. Изготовлен из качественных дышащих материалов, подходит для повседневной носки.`,
            specs: { "Материал": "80% Хлопок, 20% Полиэстер", "Цвет": color, "Стиль": "Casual / Стритвеар", "Размеры в наличии": "S, M, L, XL" }
        });
    }

    // Генерируем 30 товаров Игр
    for (let i = 1; i <= 30; i++) {
        const genre = gameGenres[i % gameGenres.length];
        const platform = platforms[i % platforms.length];
        extra.push({
            id: currentId++,
            name: `Игра: ${genre} Часть ${i}`,
            price: 1990 + (i * 100),
            category: "games",
            img: "img/games.jpg",
            description: `Захватывающая видеоигра в жанре ${genre.toLowerCase()}. Отличная графика, проработанный сюжет и десятки часов увлекательного игрового процесса.`,
            specs: { "Жанр": genre, "Платформа": platform, "Язык": "Русский / Английский", "Возрастной ценз": "16+" }
        });
    }

    // Генерируем 30 товаров Игрушек
    for (let i = 1; i <= 30; i++) {
        const type = toyTypes[i % toyTypes.length];
        const material = materials[i % materials.length];
        extra.push({
            id: currentId++,
            name: `${type} "${i}-й Век"`,
            price: 800 + (i * 90),
            category: "toys",
            img: "img/toys.jpg",
            description: `Прекрасный выбор для подарка: ${type.toLowerCase()}. Развивает мелкую моторику, логическое мышление, воображение и гарантирует веселое времяпрепровождение.`,
            specs: { "Тип товара": type, "Материал": material, "Возраст": "от 3-х лет", "Безопасность": "Сертифицировано" }
        });
    }

    return extra;
};

// Объединяем базовые и сгенерированные товары в единую базу из 102 позиций
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

    // Инициализация сайта
    renderProducts(PRODUCTS_DATABASE);
    renderHistory();

    // 1. Отрисовка карточек с автоматической задержкой анимации (--delay)
    function renderProducts(products) {
        productsGrid.innerHTML = '';
        if(products.length === 0) {
            productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#7f8c8d;">Товары не найдены</p>';
            return;
        }
        
        products.forEach((prod, index) => {
            const card = document.createElement('div');
            card.className = 'product-card animate-card';
            // Передаем индекс для красивой поочередной анимации появления
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

        // Слушатели кликов для добавления в корзину
        productsGrid.querySelectorAll('.buy-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const pId = parseInt(btn.getAttribute('data-id'));
                const product = PRODUCTS_DATABASE.find(p => p.id === pId);
                addToCart(product);
                
                btn.textContent = "Добавлено! ✓";
                btn.style.background = "#3498db";
                setTimeout(() => { btn.textContent = "В корзину"; btn.style.background = "#2ecc71"; }, 800);
            });
        });

        // Слушатели кликов для открытия модального окна (при клике на картинку, текст или кнопку "Инфо")
        const openModalElements = productsGrid.querySelectorAll('.view-details-trigger, .details-button');
        openModalElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const pId = parseInt(element.getAttribute('data-id'));
                const product = PRODUCTS_DATABASE.find(p => p.id === pId);
                openProductModal(product);
            });
        });
    }

    // 2. Логика работы модального окна подробной информации
    function openProductModal(product) {
        modalImg.src = product.img;
        modalTitle.textContent = product.name;
        modalDesc.textContent = product.description;
        
        // Очищаем и заполняем список технических характеристик
        modalSpecsList.innerHTML = '';
        for (const [key, value] of Object.entries(product.specs)) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${key}:</strong> ${value}`;
            modalSpecsList.appendChild(li);
        }

        // Привязываем ID товара к кнопке покупки внутри модалки
        modalBuyBtn.setAttribute('data-id', product.id);
        
        // Показываем окно
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Запрещаем прокрутку фона
    }

    // Закрытие модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Возвращаем прокрутку
    }

    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // Покупка из модального окна
    modalBuyBtn.addEventListener('click', () => {
        const pId = parseInt(modalBuyBtn.getAttribute('data-id'));
        const product = PRODUCTS_DATABASE.find(p => p.id === pId);
        addToCart(product);
        closeModal();
    });

    // 3. Живой поиск и фильтрация каталога
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

    searchInput.addEventListener('input', filterCatalog);
    categoryFilter.addEventListener('change', filterCatalog);

    // 4. Логика корзины покупок
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

        // Кнопки "+" / "-" / "Удалить" внутри корзины
        cartItemsList.querySelectorAll('.plus').forEach(btn => btn.addEventListener('click', (e) => {
            cart[e.target.getAttribute('data-index')].quantity += 1;
            updateCartUI();
        }));

        cartItemsList.querySelectorAll('.minus').forEach(btn => btn.addEventListener('click', (e) => {
            const idx = e.target.getAttribute('data-index');
            if (cart[idx].quantity > 1) cart[idx].quantity -= 1;
            else cart.splice(idx, 1);
            updateCartUI();
        }));

        cartItemsList.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', (e) => {
            cart.splice(e.target.getAttribute('data-index'), 1);
            updateCartUI();
        }));
    }

    // 5. Логика купона/промокода
    applyPromoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code === "SALE10") {
            isDiscountApplied = true;
            alert("Промокод применен! Скидка 10% успешно активирована.");
            updateCartUI();
        } else {
            alert("Неверный промокод!");
        }
        promoInput.value = '';
    });

    // 6. Отправка писем на Formspree
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

        if (FORMSPREE_URL.includes("ВАШ_ID_ФОРМЫ")) {
            progressBar.value = 100;
            setTimeout(() => { finalizeOrder(clientName, orderProductsText, totalSum); }, 500);
            return;
        }

        const formData = {
            "Имя клиента": clientName,
            "Email для связи": clientEmail,
            "Состав заказа": orderProductsText,
            "Итоговая сумма со скидкой": Math.round(totalSum) + " руб.",
            "Промокод": isDiscountApplied ? "Применен (SALE10)" : "Не использован",
            "Комментарий / Адрес": clientComment
        };

        progressBar.value = 60;

        fetch(FORMSPREE_URL, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                progressBar.value = 100;
                finalizeOrder(clientName, orderProductsText, totalSum);
            } else { throw new Error(); }
        })
        .catch(() => {
            alert("Ошибка сети при отправке. Заказ сохранен локально в вашей вкладке Истории.");
            finalizeOrder(clientName, orderProductsText, totalSum);
        });
    });

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

        alert(`Успешно!\n\nЗаказ оформлен.\nДанные отправлены на почту администратора.`);
        
        cart = [];
        isDiscountApplied = false;
        updateCartUI();
        orderForm.reset();
        progressContainer.style.display = 'none';
        renderHistory();
    }

    // 7. Отрисовка истории покупок
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
