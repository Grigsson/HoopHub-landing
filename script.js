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



// Yandex Map

// Elements

const mapLink = document.getElementById('mapLink');
const mapModal = document.getElementById('mapModal');
const closeMap = document.getElementById('closeMap');

let map = null;
let mapInitialized = false;



// Data for courts

const basketballCourts = [
    {
        coords: [60.014643, 30.319742],
        title: "Баскетбольная площадка",
        description: `
            <div style="max-width: 280px; font-family: Arial, sans-serif;">
                <div style="font-size: 16px; font-weight: bold; color: #ff6b00; margin-bottom: 8px;">
                    🏀 Уличная площадка
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
        `,
        type: "outdoor"
    },
    {
        coords: [60.003891, 30.331239],
        title: "Баскетбольный зал Политехник",
        description: `
            <div style="max-width: 280px; font-family: Arial, sans-serif;">
                <div style="font-size: 16px; font-weight: bold; color: #0066cc; margin-bottom: 8px;">
                    🏀 Баскетбольный зал
                </div>
                <div style="font-size: 14px; color: #333; margin-bottom: 10px;">
                    <strong>📍 Местоположение:</strong><br>
                    Санкт-Петербург, Политехническая ул.
                </div>
                <div style="font-size: 14px; color: #666; margin-bottom: 8px;">
                    <strong>📅 Расписание:</strong><br>
                    Пн и Чт: 19:00–22:00
                </div>
                <div style="border-top: 1px solid #eee; padding-top: 8px;">
                    <a href="https://yandex.ru/maps/-/CDqfENX2" 
                       target="_blank" 
                       style="display: inline-block; background: #0066cc; color: white; 
                              padding: 6px 12px; border-radius: 4px; text-decoration: none; 
                              font-size: 13px; font-weight: bold;">
                       Подробнее в Яндекс Картах
                    </a>
                </div>
            </div>
        `,
        type: "indoor"
    }
];



// Open modal with map

mapLink.addEventListener('click', (e) => {
    e.preventDefault();
    mapModal.style.display = 'flex';

    if (!mapInitialized) {
        initMap();
    }
});



// Initialize map

function initMap() {
    ymaps.ready(() => {
        mapInitialized = true;

        map = new ymaps.Map("mapContainer", {
            center: getCenterBetweenPoints(),
            zoom: 13,
            controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
        });

        addAllCourts();
        fitMapToCourts();
    });
}



// Add all basketball courts

function addAllCourts() {
    basketballCourts.forEach((court, index) => {
        const isIndoor = court.type === "indoor";
        const color = isIndoor ? "#0066cc" : "#ff6b00";
        const iconText = "🏀";

        const placemark = new ymaps.Placemark(
            court.coords,
            {
                balloonContentHeader: `
                    <div style="font-size: 18px; font-weight: bold; color: ${color}; margin-bottom: 5px;">
                        ${court.title}
                    </div>`,
                balloonContentBody: court.description,
                hintContent: `${iconText} ${court.title}`
            },
            {
                iconLayout: 'default#imageWithContent',
                iconImageHref:
                    'data:image/svg+xml;utf8,' +
                    encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                            <circle cx="20" cy="20" r="18" fill="${color}" stroke="white" stroke-width="2"/>
                            <text x="20" y="26" font-family="Arial" font-size="20" 
                                  text-anchor="middle" fill="white">${iconText}</text>
                        </svg>
                    `),
                iconImageSize: [40, 40],
                iconImageOffset: [-20, -40],
            }
        );

        map.geoObjects.add(placemark);

        if (index === 0) {
            setTimeout(() => placemark.balloon.open(), 700);
        }
    });
}



// Fit map to all markers

function fitMapToCourts() {
    map.setBounds(map.geoObjects.getBounds(), {
        checkZoomRange: true,
        zoomMargin: 50
    });
}



// Helper: center between coords

function getCenterBetweenPoints() {
    const lats = basketballCourts.map(c => c.coords[0]);
    const lons = basketballCourts.map(c => c.coords[1]);

    return [
        (Math.max(...lats) + Math.min(...lats)) / 2,
        (Math.max(...lons) + Math.min(...lons)) / 2
    ];
}



// Close modal + destroy map

function destroyMap() {
    if (map) {
        map.destroy();
        map = null;
        mapInitialized = false;
    }
}

closeMap.addEventListener('click', () => {
    mapModal.style.display = 'none';
    destroyMap();
});

window.addEventListener('click', (e) => {
    if (e.target === mapModal) {
        mapModal.style.display = 'none';
        destroyMap();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mapModal.style.display === 'flex') {
        mapModal.style.display = 'none';
        destroyMap();
    }
});


// Legend

function createLegendIfNeeded() {

    if (document.getElementById('mapLegend')) return;

    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer || !mapContainer.parentNode) return;

    const legend = document.createElement('div');
    legend.id = 'mapLegend';
    legend.style.cssText = `
        margin-top: 15px;
        padding: 12px;
        background: #f8f9fa;
        border-radius: 8px;
        font-size: 14px;
        color: #333;
        border-left: 4px solid #ff6b00;
        max-width: 420px;
    `;
    legend.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <div style="width: 20px; height: 20px; background: #ff6b00; border-radius: 50%; 
                        margin-right: 10px; display: flex; align-items: center; justify-content: center; color: white;">🏀</div>
            <span><strong>Уличная площадка</strong> - открытая</span>
        </div>
        <div style="display: flex; align-items: center;">
            <div style="width: 20px; height: 20px; background: #0066cc; border-radius: 50%; 
                        margin-right: 10px; display: flex; align-items: center; justify-content: center; color: white;">🏀</div>
            <span><strong>Закрытый зал</strong> - игры по расписанию</span>
        </div>
        <div style="margin-top: 10px; font-size: 13px; color: #666;">
            Кликните на любую метку для подробной информации
        </div>
    `;

    // Вставляем легенду после контейнера карты
    mapContainer.parentNode.insertBefore(legend, mapContainer.nextSibling);
}



// Ensure legend exists after initial DOM load

document.addEventListener('DOMContentLoaded', () => {
    createLegendIfNeeded();
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
