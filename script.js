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



//Yandex Maps

const mapLink = document.getElementById('mapLink');
const mapModal = document.getElementById('mapModal');
const closeMap = document.getElementById('closeMap');

let mapInitialized = false; // Чтобы карту не инициализировать каждый раз

mapLink.addEventListener('click', (e) => {
    e.preventDefault();
    mapModal.style.display = 'flex';

    if (!mapInitialized) {
        ymaps.ready(() => {
            const map = new ymaps.Map("mapContainer", {
                center: [59.939095, 30.315868], // Санкт-Петербург
                zoom: 11,
            });
            mapInitialized = true;
        });
    }
});

closeMap.addEventListener('click', () => mapModal.style.display = 'none');

window.addEventListener('click', (e) => {
    if (e.target === mapModal) mapModal.style.display = 'none';
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
