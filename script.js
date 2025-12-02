//Event Listener 

const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// Swiper

const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 10,

  // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,

    },

  // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
    }
});

// Modal windows
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    modal.style.display = 'flex'; // показываем модальное окно
    contactForm.reset(); // очищаем форму
});

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Модалка аккаунта
const accountLink = document.getElementById('accountLink');
const accountModal = document.getElementById('accountModal');
const closeAccount = document.getElementById('closeAccount');

// Формы
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

// Кастомные окна
const thankYouModal = document.getElementById('thankYouModal');
const closeThankYou = document.getElementById('closeThankYou');
const welcomeModal = document.getElementById('welcomeModal');
const closeWelcome = document.getElementById('closeWelcome');

// Кнопки переключения
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

// Открытие модалки аккаунта
accountLink.addEventListener('click', e => {
    e.preventDefault();
    accountModal.style.display = 'flex';
});

// Закрытие модалки
closeAccount.addEventListener('click', () => accountModal.style.display = 'none');
window.addEventListener('click', e => {
    if(e.target === accountModal) accountModal.style.display = 'none';
});

// Переключение вкладок
showRegister.addEventListener('click', () => {
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
    showRegister.classList.add('active');
    showLogin.classList.remove('active');
});
showLogin.addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    showLogin.classList.add('active');
    showRegister.classList.remove('active');
});

// Регистрация
registerForm.addEventListener('submit', e => {
    e.preventDefault();
    accountModal.style.display = 'none';
    registerForm.reset();
    thankYouModal.style.display = 'flex';
});

// Вход
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    accountModal.style.display = 'none';
    loginForm.reset();
    welcomeModal.style.display = 'flex';
});

// Закрытие кастомных окон
closeThankYou.addEventListener('click', () => thankYouModal.style.display = 'none');
closeWelcome.addEventListener('click', () => welcomeModal.style.display = 'none');
window.addEventListener('click', e => {
    if(e.target === thankYouModal) thankYouModal.style.display = 'none';
    if(e.target === welcomeModal) welcomeModal.style.display = 'none';
});



// Yandex Maps
const mapLink = document.getElementById('mapLink');
const mapModal = document.getElementById('mapModal');
const closeMap = document.getElementById('closeMap');

let mapInitialized = false;
let map; // Делаем карту глобальной для доступа из других функций

// Координаты баскетбольной площадки (Удельная, Санкт-Петербург)
const basketballCourt = {
    coords: [60.016428, 30.318315], // Координаты площадки
    title: "Баскетбольная площадка",
    description: `
        <div style="max-width: 280px; font-family: Arial, sans-serif;">
            <div style="font-size: 16px; font-weight: bold; color: #ff6b00; margin-bottom: 8px;">
                🏀 Баскетбольная площадка
            </div>
            <div style="font-size: 14px; color: #333; margin-bottom: 10px;">
                <strong>📍 Местоположение:</strong><br>
                Санкт-Петербург, м Удельная
            </div>
            <div style="font-size: 14px; color: #666; margin-bottom: 12px;">
                Уличная баскетбольная площадка для любительских игр и тренировок.
            </div>
            <div style="border-top: 1px solid #eee; padding-top: 8px;">
                <a href="https://yandex.ru/maps/org/basketbolnaya_ploshchadka/114397382840" 
                   target="_blank" 
                   style="display: inline-block; background: #ff6b00; color: white; 
                          padding: 6px 12px; border-radius: 4px; text-decoration: none; 
                          font-size: 13px; font-weight: bold;">
                   Подробнее в Яндекс Картах
                </a>
            </div>
        </div>
    `
};

mapLink.addEventListener('click', (e) => {
    e.preventDefault();
    mapModal.style.display = 'flex';

    if (!mapInitialized) {
        ymaps.ready(() => {
            // Создаем карту, центрируем на площадке
            map = new ymaps.Map("mapContainer", {
                center: basketballCourt.coords, // Центр на баскетбольной площадке
                zoom: 16, // Ближе, чтобы лучше видеть площадку
                controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
            });

            // Добавляем метку баскетбольной площадки
            addBasketballCourtMarker();
            
            mapInitialized = true;
        });
    } else {
        // Если карта уже инициализирована, центрируем ее на площадке
        if (map) {
            map.setCenter(basketballCourt.coords, 16);
            // Открываем балун с информацией
            setTimeout(() => {
                if (map.geoObjects.getLength() > 0) {
                    const placemark = map.geoObjects.get(0);
                    placemark.balloon.open();
                }
            }, 300);
        }
    }
});

// Функция для добавления метки баскетбольной площадки
function addBasketballCourtMarker() {
    // Создаем метку с кастомной иконкой (используем emoji или URL на иконку)
    const placemark = new ymaps.Placemark(
        basketballCourt.coords,
        {
            balloonContentHeader: `<div style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 5px;">Баскетбольная площадка</div>`,
            balloonContentBody: basketballCourt.description,
            hintContent: "🏀 Нажмите для информации"
        },
        {
            // Вариант 1: Используем кастомную иконку через emoji в layout
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="#ff6b00" stroke="white" stroke-width="2"/>
                    <text x="20" y="26" font-family="Arial" font-size="20" font-weight="bold" 
                    text-anchor="middle" fill="white">🏀</text>
                </svg>
            `),
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -40],
        }
    );

    // Добавляем метку на карту
    map.geoObjects.add(placemark);
    
    // Автоматически открываем балун с информацией через небольшой таймаут
    setTimeout(() => {
        placemark.balloon.open();
    }, 800);
}

// Функция для добавления нескольких точек (если захотите добавить еще площадок)
function addMultipleCourts() {
    // Пример массива с другими площадками (можно добавить позже)
    const courts = [
        {
            coords: [59.939095, 30.315868],
            title: "Другая площадка",
            description: "Описание другой площадки",
            color: "#1e98ff"
        }
    ];
    
    courts.forEach(court => {
        const marker = new ymaps.Placemark(
            court.coords,
            {
                balloonContentHeader: court.title,
                balloonContentBody: court.description
            },
            {
                preset: 'islands#circleIcon',
                iconColor: court.color || '#ff6b00'
            }
        );
        map.geoObjects.add(marker);
    });
}

// Закрытие модального окна
closeMap.addEventListener('click', () => {
    mapModal.style.display = 'none';
});

// Закрытие по клику вне окна
window.addEventListener('click', (e) => {
    if (e.target === mapModal) {
        mapModal.style.display = 'none';
    }
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mapModal.style.display === 'flex') {
        mapModal.style.display = 'none';
    }
});



//Find a game modal

document.addEventListener("DOMContentLoaded", () => {
    const findGameLink = document.getElementById("findGameLink");
    const findGameModal = document.getElementById("findGameModal");
    const closeFindGame = document.getElementById("closeFindGame");
    const gameForm = document.getElementById("gameForm");

    const searchingModal = document.getElementById("searchingModal");
    const closeSearching = document.getElementById("closeSearching");

    // Открыть окно поиска игры
    findGameLink.addEventListener("click", function(e) {
        e.preventDefault();
        findGameModal.style.display = "flex";
    });

    // Закрыть окно поиска игры
    closeFindGame.addEventListener("click", () => {
        findGameModal.style.display = "none";
    });

    // Закрыть при клике вне контента
    findGameModal.addEventListener("click", function(e) {
        if (e.target === findGameModal) findGameModal.style.display = "none";
    });

    // Отправка формы поиска
    gameForm.addEventListener("submit", function(e) {
        e.preventDefault(); // предотвращаем перезагрузку
        findGameModal.style.display = "none"; // скрываем форму
        searchingModal.style.display = "flex"; // показываем модалку поиска
    });

    // Закрытие окна поиска
    closeSearching.addEventListener("click", () => {
        searchingModal.style.display = "none";
    });

    searchingModal.addEventListener("click", function(e) {
        if (e.target === searchingModal) searchingModal.style.display = "none";
    });
});
