document.querySelector('.header-menu').addEventListener('click', function () {
	document.querySelector('.nav-icon').classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', function(){

        // показать/скрыть моб меню

        const headerMenu = document.querySelector('#header-menu');
        const menuToggle = document.querySelector('#nav-icon');
        const bodyEl = document.body;

        menuToggle.addEventListener('click', function(){
            if(this.classList.contains('active')){
                this.classList.remove('active');
                headerMenu.classList.remove('open');
                bodyEl.classList.remove('lock');
            }
            else{
                this.classList.add('active');
                headerMenu.classList.add('open');
                bodyEl.classList.add('lock');
            }
    });
    headerMenu.addEventListener('click', function(){
        this.classList.remove('open');
        menuToggle.classList.remove('active');
        bodyEl.classList.remove('lock');
    });

});





$(document).ready(function () {

   //fake-placeholder
   const formInputs = document.querySelectorAll('.card-field');
   for(let item of formInputs){
       const inputPlaceholder = item.nextElementSibling;
       item.addEventListener ('focus', function(){
            inputPlaceholder.classList.add('contacts-active');
       })
       //Если мой элемент (импут) имеет такое событие как blur пусть в этом случае выполняется функция, которая проверяет сначала 
       //если мой этот импут если у него value (то что пользователь ввел) равен пустоте "", в этом случае удалить этот класс эктив у inputplaceholdera мы add меняем на remove
       item.addEventListener('blur', function (){
           if (this.value == ''){
               inputPlaceholder.classList.remove('contacts-active');
           }
       })
   }

   //ВАЛИДАЦИЯ ФОРМЫ
   //Скрипт валидации формы, проверка на заполненность полей (на почту)
   //1-я нахожу на своей странице форму, т.е. я нахожу в своем документе див с id contacts-card
   //2-и к этой форме я применяю метод/функция validate, это тот самый метод который описан в библиотеке jquery-validate которую мы добавили в наш проект
   //3-создаем правило, по которому будет проверяться форма, правило пишется для каждого импута и импут выбирается по имени
   //4- есть импут с именем имэл, правило-объект (в js если фигурные скобки, то передается обект), какой объект -requared- это поле, которое отвечает за заполненность в поле, за наличие какого-то текста в поле, и для этого параметра мы ставим true - т.е. поле обязательно должно быть заполнено
   //5-есть метод email: -этот метод проверяет на корректность заполнения электронной почты, т.е. присутствует ли символ @ "эт"
   //6-метод messages: будет показывать сооющения для пользователя, если како-либо из правил не выполнено, если не выполнились правила для email:, мы можем показать такой текст пользователю "Введите Ваш email", ну а еслине прошла проверка на корректность мы покажем такое сообщение 'Отсутствует символ @'.

    $('#contacts-card').validate({
        rules: {
            email: {
               required: true,
               email: true
            },
            theme: {
                required: true
            },
            message: {
                required: true
            }
        },
        messages: {
            email: {
                required: 'Введите Ваш email',
                email: 'Отсутствует символ @'
            },
            theme: {
                required: 'Введите тему сообщения'
            },
            message: {
                required: 'Введите текст сообщения'
            }
        },

        //Если все эти шаги прошли успешно, нам надо добавить следующее поле, следующую функцию
        submitHandler: function (form) {
            ajaxFormSubmit();
        }
   });
   
   //Функция AJAX запроса на сервер, этот запрос хороше тем, что при отправке формы  на сервер страница не перезагрузиться, мы останемся на той же стр с кот отправили форму.
   function ajaxFormSubmit() {
       let string = $(".contacts-card").serialize();//в переменную стринг, методом serialize из моей формы contacts-card Сохрани все данные введенные в форму, в виде строки.
       //Сохраняем данные введенные в форму, в строку.

       //Формируем AJAX запрос
       $.ajax ({
           type: "POST", //Типа запроса POST (есть два метода post и get)
           url: "php/mail.php", //Куда отправляем запрос   php\php\mail.php
           data: string, //Что уйдёт? Какие данные отправляем, в данном случае отправляем переменную string

           //Если все прошло успешно, используем функцию
           success: function (html) {
                $("#contacts-card").slideUp(800); //Форма плавно скрывается за 0,8секунды
                $("#answer").html(html); //и диву с id = answer должен прописаться html-текст
           }
       });

       //Чтобы после submit ничего не выполнялось - делаем возврат false чтобы прервать цепочку срабатывания остальных функций
       return false;
   }


   // back-top -- стрелка скролла к верху сайта
   $('#back-top').hide(); // скрываем методом hide
   $(window).scroll(function () { //если у моего окна, объекта виндоу, имеется скролл (есть такой метод), то пусть выполнится функция:
        if($(this).scrollTop() > 200){ // если оно (окно) в данном случае имеет скролл тор, т.е. прокуртилось вверх, на значение более чем 200пикселей, в этом случае пусть
            $('#back-top').fadeIn(); // наша кнопка back-top плавненько покажется fadeIn
        }
        else{  // в проиивном случае, 
            $('#back-top').fadeOut(); // скрой мою кнопочку fadeOut
        }
   })
})
