var mainHeaderTop = document.querySelector(".main-header__top");
var hamburger = document.querySelector(".main-header__toggle");
var mainNav = document.querySelector(".main-nav");
var userNav = document.querySelector(".user-nav");
var popup = document.querySelector("modal");

mainHeaderTop.classList.remove("no-js");

hamburger.addEventListener("click", function(event) {
  event.preventDefault();

  hamburger.classList.toggle("main-header__toggle--opened");
  mainNav.classList.toggle("main-nav--closed");
  userNav.classList.toggle("user-nav--closed");
});
