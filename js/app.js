"use strict"
// обработка формы обратной связи
document.addEventListener('DOMContentLoaded', function () {

	const form = document.getElementById('form');
	// при отправке формы - функция formSend
	form.addEventListener('submit', formSend);


	async function formSend(e) {
		// запрещается стандартная отправка формы при нажатии на кнопку
		e.preventDefault();
      // валидация формы
		let error = formValidate(form);

		// все данные полей формы	
		let formData = new FormData(form);
	
		if (error === 0) {
		   //form.classList.add('_sending');
			form_clean(form);
			alert("Отправка..");
		} else {
			alert('Ошибка при заполнении формы. Заполните обязательные поля!');
		}
	}

   // функция проверки формы
	function formValidate(form) {
		let error = 0;
		// formReq - обязательные для заполнения поля
		let formReq = document.querySelectorAll('.req'); 

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			// перед проверкой объекта удаляю из него класс err 
			formRemoveError(input);
			// проверка имени
			if (input.classList.contains('name')) {
				if (nameTest(input)) {
					formAddError(input);
					error++;
					console.log('ошибка имени');
				}
			}else if (input.value === '') {
					formAddError(input);
					error++;
				}
			// проверка почты
			if (input.classList.contains('email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
					console.log('ошибка почты');
				}
			}else if (input.value === '') {
					formAddError(input);
					error++;
				}
			// проверка телефона
			if (input.classList.contains('phone')) {
				if (phoneTest(input)) {
					formAddError(input);
					error++;
					console.log('ошибка телефона');
				}
			} else if (input.value === '') {
				formAddError(input);
				error++;
			}
		}
		return error;
	}

	// функция добавляет объекту и его родителю класс _error
	function formAddError(input) {
		input.parentElement.classList.add('err');
		input.classList.add('err');
	}
	// функция удаляет из объекта  и его родителю класс _error
	function formRemoveError(input) {
		input.parentElement.classList.remove('err');
		input.classList.remove('err');
	}
	// Функция проверки name
	function nameTest(input) {
		let regexp = /^(?:[a-zA-Z0-9_()\s]+)|(?:[а-яА-Я0-9_()\s]+)$/;
		return !regexp.test(input.value);
	}
	// Функция проверки email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
	// Функция проверки tel
	function phoneTest(input) {
		let regexp = /[\d\-\)\(\+ ]+/;
		return !regexp.test(input.value);
	}
	// очистка формы после отправки
	function form_clean(form) {
		let inputs = form.querySelectorAll('input');
		for (let index = 0; index < inputs.length; index++) {
			const el = inputs[index];
			el.value = el.getAttribute('placeholder');
		}
	}
});


"use strict"

window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
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
			isMobile.Windows());
	}
};

// если страница открыта на тачскрине добавляется класс _touch, на десктопе _pc
if (isMobile.any() ) {
   document.body.classList.add('_touch');
   // переменная для всех стрелок на странице 
   let menuArrows = document.querySelectorAll('.menu__arrow');
   if (menuArrows.length > 0) {
		//на каждую стрелку в массиве всех стрелок навесить событие click,
		//а родителю добавить класс _active
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function(){
            menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}

} else {
   document.body.classList.add('_pc');
}

//Меню-бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
		iconMenu.addEventListener("click", function(e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle("_active");
		menuBody.classList.toggle("_active");
	});

}


// Прокрутка по клику в меню
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	})
	function onMenuLinkClick(e) {
		const menuLink = e.target;
		// нужно проверить существует ли дата-аттрибут и его объект
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			// расчет положения прокрутки
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
			// навигация в меню в мобильной версии

			if (document.querySelector('.menu__icon').classList.contains('_active')) {
				document.body.classList.remove('lock');
				document.querySelector('.menu__icon').classList.remove('_active');
				document.querySelector('.menu__body').classList.remove('_active');
			}
			// скролл к нужному месту
			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			//e.preventDefault();
		}
	}
}

// оптимизация картинок с классом ibg
function ibg(){

	let ibg=document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
	if(ibg[i].querySelector('img')){
	ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
	}
	}
	}
	
	ibg();



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
