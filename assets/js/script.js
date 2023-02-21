//global var
var currentDate = moment().format("dddd, Do MMMM YYYY, hh:mm a");
// var currentTime = moment().format("HH");
var currentTime = 12;
var saveList = [];
var userInput = [];
var elementId;

//Functions

function loadLog() {
  var savedLog = JSON.parse(localStorage.getItem("saveList"));
  console.log(savedLog);
  if (savedLog !== null) {
    for (i = 0; i < savedLog.length; i++) {
      if (i > 18) {
        break;
      } else {
        $(`${savedLog[i + 1]}`).html(savedLog[i]);
      }
    }
  }
}

function saveLog(arr) {
  if (!saveList || saveList.length < 8) {
    saveList = arr;
    localStorage.setItem("saveList", JSON.stringify(saveList));
    userInput.length = 0;
  }
}

$("button").on("click", (e) => {
  e.preventDefault();
  if (!userInput || userInput.length < 8) {
    for (i = 9; i < 18; i++) {
      if (i > 18) {
        break;
      } else {
        userInput.unshift("#event-" + i);
        userInput.unshift($("#" + "event-" + i).val());
      }
    }
  }
  saveLog(userInput);
});

$("textarea").on("click", function (event) {
  elementId = event.target.id;
  console.log(elementId);
});

function init() {
  //   $('[class*="time-"]').each(function () {
  //     // Extract the number from the class name using a regular expression
  //     blockTime = parseInt($(this).attr("class").match(/\d+$/));
  for (blockTime = 8; blockTime < 18; blockTime++) {
    switch (true) {
      case blockTime < currentTime:
        $(`.time-${blockTime}`).addClass("past");
        $(`#event-${blockTime}`).addClass("past");
        break;
      case blockTime > currentTime:
        $(`.time-${blockTime}`).addClass("future");
        $(`#event-${blockTime}`).addClass("future");
        break;
      default:
        $(`.time-${blockTime}`).addClass("present");
        $(`#event-${blockTime}`).addClass("present");
        break;
    }
    console.log(blockTime);
  }
  loadLog();
}

init();

//Script
$("#currentDay").text(currentDate);
