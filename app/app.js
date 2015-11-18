(function(){
'use strict';

function config ($routeProvider, $locationProvider, $httpProvider, $translateProvider) {
    $routeProvider
    .when('/', {
     templateUrl: '/views/main.html',
     controller: 'MainCtrl',
    })
    .when('/about', {
      templateUrl: '/views/about_us.html',
      controller: 'AboutUsCtrl',
    })
    .when('/feedback', {
      templateUrl: '/views/feedback.html',
      controller: 'FeedbackCtrl',
    })
    .when('/price', {
      templateUrl: '/views/price.html',
      controller: 'PriceCtrl',
    })
    .when('/confirmation/:param', {
      templateUrl: '/views/confirmation.html',
      controller: 'ConfirmationCtrl',
    })
    .when('/final', {
      templateUrl: '/views/final.html',
      controller: 'FinalCtrl',
    });

    $locationProvider.html5Mode(true);
    $routeProvider.otherwise("/");
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $translateProvider
    .translations('en', {
      BUTTON_TEXT_EN: 'eng',
      BUTTON_TEXT_RU: 'rus',

      MENU_MAIN: 'Main',
      MENU_PRICE: 'Price',
      MENU_ABOUT: 'About',
      MENU_FEEDBACKS: 'Feedbacks',

      MAIN_WELCOME_TEXT: 'Welocome to Irden site!',
      MAIN_GREETINGS_TEXT: 'Hello dear visitor. Here you can get general information about us, our services, and place an order or leave feedback.',
      MAIN_ORDER_BUTTON_TOP: 'Place an order',
      MAIN_ORDER_BUTTON_BOTTOM: 'Do it!!!',
      MAIN_PRICE_HEADER: 'Price',
      MAIN_PRICE_TEXT: 'Here you can get general information about our performances',
      MAIN_PRICE_BUTTON: 'View details',
      MAIN_ABOUT_HEADER: 'About us',
      MAIN_ABOUT_TEXT: 'Here you can read general information about our team, and find content about our performances',
      MAIN_ABOUT_BUTTON: 'View more',
      MAIN_FEEDBACK_HEADER: 'Feedbacks',
      MAIN_FEEDBACK_TEXT: '',
      MAIN_FEEDBACK_BUTTON: 'Read more',

      PRICE_MAIN_HEADER: 'Prices',
      PRICE_MAIN_TEXT: 'Here you can find detailed information about our prices',
      PRICE_DETAIL_HEADER: 'Our detailed prices',
      PRICE_DETAIL_TEXT: 'Here you can find out what we propose, and choose one proposition',
      PRICE_TABLE_CHOOSE_BUTTON: 'This one!',
      PRICE_TABLE_CHOOSE: 'Choose',
      PRICE_TABLE_NAME: 'Name',
      PRICE_TABLE_COST: 'Cost',
      PRICE_TABLE_DURATION: 'Duration',
      PRICE_TABLE_PARTICIPANTS: 'Participants',
      PRICE_TABLE_DESCRIPTION: 'Description',
      PRICE_TABLE_BUTTON: 'Show/Hide',

      ABOUT_MAIN_HEADER: 'About us',
      ABOUT_MAIN_TEXT: 'We are young but scillfull fire team. We took part in number of festivals and ready to surprise you',

      FINAL_MAIN_HEADER: 'Thank you!',
      FINAL_MAIN_TEXT: 'Thank you for your order, we will connect with you soon',
      FINAL_RETURN_BUTTON: 'Go to main page',

      FEEDBACK_FORM_RATE: 'Rate it please',

      FEEDBACK_MAIN_HEADER: 'Feedback',
      FEEDBACK_MAIN_TEXT: 'Here you can leave feedback if you want',
      FEEDBACK_FORM_HEADER: 'Leave feedback',

      FEEDBACK_FORM_TITLE: 'Title:',
      FEEDBACK_FORM_TITLE_REQUIRED: 'Title is required',
      FEEDBACK_FORM_TITLE_PLACEHOLDER: 'Here you need to enter title of your message to us',
      FEEDBACK_FORM_TITLE_TOOLTIP: 'Enter title please',

      FEEDBACK_FORM_MESSAGE: 'Message:',
      FEEDBACK_FORM_MESSAGE_REQUIRED: 'Message is required',
      FEEDBACK_FORM_MESSAGE_PLACEHOLDER: 'Here you need to enter your message to us',
      FEEDBACK_FORM_MESSAGE_TOOLTIP: 'Enter message please',

      FEEDBACK_FORM_AUTHOR: 'Author:',
      FEEDBACK_FORM_AUTHOR_REQUIRED: 'You name is required',
      FEEDBACK_FORM_AUTHOR_PLACEHOLDER: 'Here you need to enter your full name',
      FEEDBACK_FORM_AUTHOR_TOOLTIP: 'Enter full name please',

      FEEDBACK_FORM_EMAIL: 'Email (doesn\'t shown at feedback):',
      FEEDBACK_FORM_EMAIL_INVALID: 'Email is required.',
      FEEDBACK_FORM_EMAIL_REQUIRED: 'Invalid email address.',
      FEEDBACK_FORM_EMAIL_PLACEHOLDER: 'your@email.xx',
      FEEDBACK_FORM_EMAIL_TOOLTIP: 'Enter your email, please',

      FEEDBACK_FORM_SUBMIT: 'Send',

      CONFIRMATION_MAIN_HEADER: 'Here you can confirm your order',
      CONFIRMATION_CHOOSEN_HEADER: 'You choose this programm:',
      CONFIRMATION_CHOOSEN_NAME: 'Name:',
      CONFIRMATION_CHOOSEN_COST: 'Cost:',
      CONFIRMATION_CHOOSEN_DESCRIPTION: 'Description:',

      CONFIRMATION_FORM_NAME: 'Name:',
      CONFIRMATION_FORM_NAME_REQUIRED: 'You name is required.',
      CONFIRMATION_FORM_NAME_PLACEHOLDER: 'Here you need to enter your name',
      CONFIRMATION_FORM_NAME_TOOLTIP: 'Enter your name please',

      CONFIRMATION_FORM_PHONE: 'Phone number:',
      CONFIRMATION_FORM_PHONE_REQUIRED: 'You phone is required.',
      CONFIRMATION_FORM_PHONE_PLACEHOLDER: '+375(XX) XXX-XX-XX',
      CONFIRMATION_FORM_PHONE_TOOLTIP: 'Enter your phone number please',

      CONFIRMATION_FORM_EMAIL: 'Email:',
      CONFIRMATION_FORM_EMAIL_WRONG: 'Wrong email.',
      CONFIRMATION_FORM_EMAIL_PLACEHOLDER: 'your@mail.xx',
      CONFIRMATION_FORM_EMAIL_TOOLTIP: 'Enter your email please',

      CONFIRMATION_FORM_DATE: 'Desired date:',
      CONFIRMATION_FORM_DATE_PLACEHOLDER: 'Here you need to enter desired date of performance',
      CONFIRMATION_FORM_DATE_TOOLTIP: 'Enter desired date please',

      CONFIRMATION_FORM_TIME: 'Desired time:',
      CONFIRMATION_FORM_POST: 'Post',
    })
    .translations('ru', {
      BUTTON_TEXT_EN: 'анг',
      BUTTON_TEXT_RU: 'рус',

      MENU_MAIN: 'Главная',
      MENU_PRICE: 'Цены',
      MENU_ABOUT: 'О нас',
      MENU_FEEDBACKS: 'Отзывы',

      MAIN_WELCOME_TEXT: 'Добро пожаловать на сайт Irden',
      MAIN_GREETINGS_TEXT: 'Приветствуем вас! Здесь вы можете найти информацию о нас, наших услугах, ознакомится с отзывами и сделать заказ',
      MAIN_ORDER_BUTTON_TOP: 'Сделать заказ',
      MAIN_ORDER_BUTTON_BOTTOM: 'Жми!!!',
      MAIN_PRICE_HEADER: 'Услуги',
      MAIN_PRICE_TEXT: 'Здесь вы можете найти основную информацию о наших представлениях',
      MAIN_PRICE_BUTTON: 'Посмотреть детали',
      MAIN_ABOUT_HEADER: 'О нас',
      MAIN_ABOUT_TEXT: 'Здесь вы можете найти много информации о нас и наших представлениях',
      MAIN_ABOUT_BUTTON: 'Увидеть больше',
      MAIN_FEEDBACK_HEADER: 'Отзывы',
      MAIN_FEEDBACK_TEXT: '',
      MAIN_FEEDBACK_BUTTON: 'Прочитать остальные',

      PRICE_MAIN_HEADER: 'Услуги',
      PRICE_MAIN_TEXT: 'Здесь вы можете найти подробную информацию о наших услугах',
      PRICE_DETAIL_HEADER: 'Подробная информация о услугах',
      PRICE_DETAIL_TEXT: 'Изучите наши услуги, и выберите наиболее подходящую',
      PRICE_TABLE_CHOOSE: 'Выбрать',
      PRICE_TABLE_CHOOSE_BUTTON: 'Эту!',
      PRICE_TABLE_NAME: 'Название',
      PRICE_TABLE_COST: 'Цена',
      PRICE_TABLE_DURATION: 'Продолжительность',
      PRICE_TABLE_PARTICIPANTS: 'Участники',
      PRICE_TABLE_DESCRIPTION: 'Описание',
      PRICE_TABLE_BUTTON: 'Показать/Скрыть',

      ABOUT_MAIN_HEADER: 'О нас',
      ABOUT_MAIN_TEXT: 'Мы молодой, но умелый фаер театр. За малый срок нашего существования мы приняли участиа в ряде фестивалей и готовы приятно вас удивить',

      FINAL_MAIN_HEADER: 'Спасибо вам!',
      FINAL_MAIN_TEXT: 'Спасибо за ваш заказ, мы скоро свяжемся с вами',
      FINAL_RETURN_BUTTON: 'Вернуться на главную',

      FEEDBACK_MAIN_HEADER: 'Отзывы',
      FEEDBACK_MAIN_TEXT: 'Здесь вы можете оставить отзыв, если желаете',
      FEEDBACK_FORM_HEADER: 'Оставить отзыв',

      FEEDBACK_FORM_TITLE: 'Заглавие:',
      FEEDBACK_FORM_TITLE_PLACEHOLDER: 'Здесь необходимо указать заголовок сообщения',
      FEEDBACK_FORM_TITLE_TOOLTIP: 'Напишите заголовок, пожалуйста',

      FEEDBACK_FORM_MESSAGE: 'Текст отзыва:',
      FEEDBACK_FORM_MESSAGE_PLACEHOLDER: 'Здесь необходимо коротко описать ваши впечатления',
      FEEDBACK_FORM_MESSAGE_TOOLTIP: 'Опишите ваши впечатления, пожалуйста',

      FEEDBACK_FORM_AUTHOR: 'Ваше имя:',
      FEEDBACK_FORM_AUTHOR_PLACEHOLDER: 'Здесь необходимо написать ваше имя',
      FEEDBACK_FORM_AUTHOR_TOOLTIP: 'Введите имя, пожалуйста',

      FEEDBACK_FORM_EMAIL: 'Ваш емейл (не будет отображен в отзыве):',
      FEEDBACK_FORM_EMAIL_PLACEHOLDER: 'ваша@почта.xx',
      FEEDBACK_FORM_EMAIL_TOOLTIP: 'Введите ваш email, пожалуйста',

      FEEDBACK_FORM_SUBMIT: 'Отправить',
      FEEDBACK_FORM_EMAIL_INVALID: 'Укажите емейл.',
      FEEDBACK_FORM_EMAIL_REQUIRED: 'Укажите корректный емейл.',
      FEEDBACK_FORM_MESSAGE_REQUIRED: 'Введите текст сообщения',
      FEEDBACK_FORM_TITLE_REQUIRED: 'Введите заголовок',
      FEEDBACK_FORM_RATE: 'Оцените, пожалуйста',
      FEEDBACK_FORM_AUTHOR_REQUIRED: 'Укажите ваше имя',

      CONFIRMATION_MAIN_HEADER: 'Здесь вы можете подтвердить ваш заказ',
      CONFIRMATION_CHOOSEN_HEADER: 'Вы выбрали указанную программу:',
      CONFIRMATION_CHOOSEN_NAME: 'Название:',
      CONFIRMATION_CHOOSEN_COST: 'Цена:',
      CONFIRMATION_CHOOSEN_DESCRIPTION: 'Описание:',

      CONFIRMATION_FORM_NAME: 'Ваше имя:',
      CONFIRMATION_FORM_NAME_REQUIRED: 'Укажите ваше имя.',
      CONFIRMATION_FORM_NAME_PLACEHOLDER: 'Здесь необходимо написать ваше имя',
      CONFIRMATION_FORM_NAME_TOOLTIP: 'Укажите имя, пожалуйста',

      CONFIRMATION_FORM_PHONE: 'Номер телефона:',
      CONFIRMATION_FORM_PHONE_REQUIRED: 'Номер телефона необходим для связи с вами.',
      CONFIRMATION_FORM_PHONE_PLACEHOLDER: '+375(XX) XXX-XX-XX',
      CONFIRMATION_FORM_PHONE_TOOLTIP: 'Введите ваш номер телефона, пожалуйста',

      CONFIRMATION_FORM_EMAIL: 'Емейл:',
      CONFIRMATION_FORM_EMAIL_WRONG: 'Укажите верный емейл.',
      CONFIRMATION_FORM_EMAIL_PLACEHOLDER: 'ваша@почта.хх',
      CONFIRMATION_FORM_EMAIL_TOOLTIP: 'Введите email, пожалуйста',

      CONFIRMATION_FORM_DATE: 'Желаемая дата:',
      CONFIRMATION_FORM_DATE_PLACEHOLDER: 'Здесь вы можете указать желаемую дату выступления',
      CONFIRMATION_FORM_DATE_TOOLTIP: 'Введите желаемую дату, пожалуйста',

      CONFIRMATION_FORM_TIME: 'Желаемое время:',

      CONFIRMATION_FORM_POST: 'Отправить',
    });
    $translateProvider.preferredLanguage('en');
  //  $translateProvider.useSanitizeValueStrategy('sanitize');
}
// Declare app level module which depends on views, and components
angular
.module('irdenPage', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  //'ngSanitize',
  'pascalprecht.translate',
  'irdenPage.about_us',
  'irdenPage.main',
  'irdenPage.feedback',
  'irdenPage.price',
  'irdenPage.confirmation',
  'irdenPage.final',
])
.config(config)
.controller('TranslateController', function($translate, $scope) {
  console.log('we in TranslateController');
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    console.log("lang:"+langKey);
  };
});
  // configure html5 to get links working on jsfiddle
})();
