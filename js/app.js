"use strict";
// обработка формы обратной связи
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const subscribeSection = document.getElementById("subscribe");
  // при отправке формы - функция formSend
  form.addEventListener("submit", formSend);

  let errormessage1, errormessage2;

  async function formSend(e) {
    // запрещается стандартная отправка формы при нажатии на кнопку
    e.preventDefault();
    // валидация формы
    let error = formValidate(form);

    // создаёт новый объект FormData - HTML-форму
    let formData = new FormData(form);

    const tooltip = document.getElementById("tooltip");

    if (error === 0 && tooltip.classList.contains("tooltip_show")) {
      subscribeSection.classList.add("_sending");
      setTimeout(() => subscribeSection.classList.remove("_sending"), 3000);
      hideTooltip();
      form.reset();
    } else if (error === 0) {
      subscribeSection.classList.add("_sending");
      setTimeout(() => subscribeSection.classList.remove("_sending"), 3000);
      form.reset();
    } else {
      showTooltip();
    }
  }

  // функция проверки формы
  function formValidate(form) {
    let error = 0;
    // formReq - обязательные для заполнения поля
    let formReq = document.querySelectorAll(".req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      // перед проверкой объекта удаляю из него класс err
      formRemoveError(input);
      // проверка почты
      if (input.classList.contains("email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
          errormessage1 = "ошибка в почте";
          document.getElementById("errorMessage1").innerHTML = errormessage1;
        }
      } else if (input.value === "") {
        formAddError(input);
        error++;
      }
      // проверка телефона
      if (input.classList.contains("phone")) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
          errormessage2 = "ошибка в номере телефона";
          document.getElementById("errorMessage2").innerHTML = errormessage2;
        }
      } else if (input.value === "") {
        formAddError(input);
        error++;
      }
    }
    return error;
  }

  // функция добавляет объекту и его родителю класс _error
  function formAddError(input) {
    input.parentElement.classList.add("err");
    input.classList.add("err");
  }
  // функция удаляет из объекта  и его родителю класс _error
  function formRemoveError(input) {
    input.parentElement.classList.remove("err");
    input.classList.remove("err");
  }
  // Функция проверки email
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
  // Функция проверки tel
  function phoneTest(input) {
    let regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    return !regexp.test(input.value);
  }
  // Функция показывает подсказку, если есть ошибки при заполнении формы
  function showTooltip() {
    tooltip.classList.add("tooltip_show");
    const tooltipCloseBtn = document.getElementById("tooltip__close");

    tooltipCloseBtn.addEventListener("click", (event) => {
      tooltipCloseBtn.parentElement.classList.remove("tooltip_show");
    });
  }
  // Функция скрывает подсказку
  function hideTooltip() {
    tooltip.classList.remove("tooltip_show");
  }
});

"use strict";

window.addEventListener("load", function () {
  if (document.querySelector(".wrapper")) {
    setTimeout(function () {
      document.querySelector(".wrapper").classList.add("_loaded");
    }, 0);
  }
});

let unlock = true;

// проверка на каком устройстве открыта страница
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

// если страница открыта на тачскрине добавляется класс _touch, на десктопе _pc
if (isMobile.any()) {
  document.body.classList.add("_touch");
  // переменная для всех стрелок на странице
  let menuArrows = document.querySelectorAll(".menu__arrow");
  if (menuArrows.length > 0) {
    //на каждую стрелку в массиве всех стрелок навесить событие click,
    //а родителю добавить класс _active
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function () {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
} else {
  document.body.classList.add("_pc");
}

//Меню-бургер
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}

////////////////////////// Прокрутка по клику в меню////////////////////////////
const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    // нужно проверить существует ли дата-аттрибут и его объект
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      // расчет положения прокрутки
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top + pageYOffset;
      // навигация в меню в мобильной версии

      if (document.querySelector(".menu__icon").classList.contains("_active")) {
        document.body.classList.remove("lock");
        document.querySelector(".menu__icon").classList.remove("_active");
        document.querySelector(".menu__body").classList.remove("_active");
      }
      // скролл к нужному месту
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
    }
  }
}

//////////////////// оптимизация картинок с классом ibg////////////////////////
function ibg() {
  let ibg = document.querySelectorAll(".ibg");
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage =
        "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}

ibg();

////////////////////////// реализация кнопки "вверх"////////////////////////////

// функция отслеживает прокрутку документа и добавляет-удаляет соотв. класс
function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    buttonUp.classList.add("side-button-up-show");
  }
  if (scrolled < coords) {
    buttonUp.classList.remove("side-button-up-show");
  }
}

// функция прокрутки экрана вверх
function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -50);
    setTimeout(backToTop, 10);
  }
}

const buttonUp = document.querySelector(".side-button-up");

// scroll отслеживает прокрутку страницы
window.addEventListener("scroll", trackScroll);
buttonUp.addEventListener("click", backToTop);


/////////////////////////////////////////////////////////////////////////////

// Добавление Яндекс карты

ymaps.ready(init);
function init() {
		var myMap = new ymaps.Map("map", {
		// Координаты центра карты.
		controls: [],
		center: [55.652339, 37.668246],
		zoom: 13
	});
	var myPlacemark = new ymaps.Placemark([55.652339, 37.668246],{
		balloonContentHeader: 'Sup Rental Company',
		balloonContentBody: 'Москва, Каширское шоссе, 31к2с3',
		balloonContentFooter: '+7 (987) 567 34 09',
		hasBalloon: true});
	
	myMap.geoObjects.add(myPlacemark);
	myMap.behaviors.disable('scrollZoom');
	myMap.behaviors.disable('drag');

}
let count = 0;
let width;
const container = document.querySelector(".slider__container");
const track = document.querySelector(".slider-track");
const items = document.querySelectorAll(".slide");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const indicatorParent = document.querySelector(".control ul");
const indicators = document.querySelectorAll(".control li");
//mobile devices (touch events): чувствительность — количество пикселей, после которого жест будет считаться свайпом
const sensitivity = 20;

// навигация по точкам
indicators.forEach((indicator, i) => {
  indicator.addEventListener("click", () => {
    document.querySelector(".control .selected").classList.remove("selected");
    indicator.classList.add("selected");
    count = i;
    rollSlider();
  });
});

function calcWidth() {
  width = container.clientWidth;
  track.style.width = width * items.length + "px";
  items.forEach((item) => {
    item.style.width = width + "px";
    item.style.height = "auto";
  });
  rollSlider();
}

calcWidth();

//при изменении размера представления документа/окна - вызвать calcWidth
window.addEventListener("resize", calcWidth);

function rollSlider() {
  // перемещает на ширину одного слайда
  track.style.transform = "translate(-" + count * width + "px)";
}

function moveRight() {
  count--;
  if (count < 0) {
    count = items.length - 1;
  }
}

function moveLeft() {
  count++;
  if (count >= items.length) {
    count = 0;
  }
}

// на десктопах навигация по стрелкам
btnNext.addEventListener("click", function () {
  moveLeft();
  document.querySelector(".control .selected").classList.remove("selected");
  indicatorParent.children[count].classList.add("selected");
  rollSlider(); // при изменении размеров экрана пересчитывает смещение и ширину
});
btnPrev.addEventListener("click", function () {
  moveRight();
  document.querySelector(".control .selected").classList.remove("selected");
  indicatorParent.children[count].classList.add("selected");
  rollSlider();
});

//mobile devices - touch events
let touchStart = null; //Точка начала касания
let touchPosition = null; //Текущая позиция
//Начало касания
track.addEventListener("touchstart", function (e) {
  TouchStart(e);
});
//Движение пальцем по экрану
track.addEventListener("touchmove", function (e) {
  TouchMove(e);
});
//Пользователь отпустил экран
track.addEventListener("touchend", function (e) {
  TouchEnd(e);
});

function TouchStart(e) {
  //текущая позиция касания
  touchStart = {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY,
  };
  touchPosition = { x: touchStart.x, y: touchStart.y };
}
function TouchMove(e) {
  e.preventDefault();
  touchPosition = {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY,
  };
}
function TouchEnd(e) {
  // проверка какой жест совершил пользователь
  CheckAction();
  // обнуление позиций
  touchStart = null;
  touchPosition = null;
}

function CheckAction() {
  // Расстояния от начальной до конечной точек по обеим осям
  let d = {
    x: touchStart.x - touchPosition.x,
    y: touchStart.y - touchPosition.y,
  };
  // Проверка: движение по какой оси было длиннее
  if (Math.abs(d.x) > Math.abs(d.y)) {
    // Проверка: было ли движение достаточно длинным
    if (Math.abs(d.x) > sensitivity) {
      // больше нуля - движение пальцем справа налево
      if (d.x > 0) {
        // console.log("Swipe left");
        moveLeft();
        rollSlider();
      } // иначе - движение слева направо
      else {
        // console.log("Swipe right");
        moveRight();
        rollSlider();
      }
    }
  }
}
