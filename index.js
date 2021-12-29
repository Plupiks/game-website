var buttonsColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;



// Старт игры при нажатии клавиши
$(document).keypress(function (e) {

  if (!started) {
    if (e.key === "a" || e.key === "A" || e.key === "ф" || e.key === "Ф") {
      $("#level-title").text("level " + level);
      nextSequence();
      started = true;
    }
  }
})



// Клик по нужным кнопкам, их анимация
$(".btn").click(function () {
  // Вибираю кнопку на которую был произведен клик
  var userChosenColour = $(this).attr('id');

  // Название кнопки заношу в массив
  userClickedPattern.push(userChosenColour);

  // Анимация кнопки
  animatePress(userChosenColour);

  // Проверка правильности выбора
  checkAnswer(userClickedPattern.length - 1);

  // Проигрывание мелодии кнопки
  playSound(userChosenColour);
})


// Функция проверки правильного выбора
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {

    $(".background").addClass("game-over");
    setTimeout(function () {
      $(".background").removeClass("game-over");
    }, 200)
    playSound("wrong");

    $("#level-title").text(`Game Over, Press "A" Key to Restart`);

    gameOver();

  }

  console.log(gamePattern);
  console.log(userClickedPattern);
}



// Условие перехода на след. уровень
function nextSequence() {
  // Очищает массив для нового уровня (если не сделать тогда игра работает не коректно (слишком просто играть))
  userClickedPattern = [];


  level++;
  // Меняем текст под нужный уровень
  $("#level-title").text("Level " + level);

  // Выбираем рандомное число от 0 до 3
  var randNumber = randomNumber(0, 3);

  // Функция выбора рандомного числа
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  // Получаем рандомный элемент из массива
  var randomChosemColour = buttonsColours[randNumber];


  // Заносим выбранный цвет в пустой массив
  gamePattern.push(randomChosemColour);

  // Эффект flash
  var colourObj = $("#" + randomChosemColour);
  colourObj.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Играет нужный аудиофайл 
  playSound(randomChosemColour);
}



// Функция для проигрывания мелодии
function playSound(name) {
  var audioColour = new Audio("sounds/" + name + ".mp3");
  audioColour.play();
}



// Функция для анимации
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Рестарт игры
function gameOver() {
  gamePattern = [];
  level = 0;
  started = false;
}