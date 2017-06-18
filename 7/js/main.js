;(function() {

/*====================================================================
                                SLIDER
======================================================================*/
  var slideNow = 1;
  var sliderList = document.querySelector(".slider__list");
  var slideCount = document.querySelector(".slider__list").children.length;
  var translateWidth = 0;
  // var slideInterval = 5000;
  var next = document.querySelector(".slider__btn--next");
  var prev = document.querySelector(".slider__btn--prev");

  document.addEventListener('DOMContentLoaded', function(){
      // setInterval(nextSlide, slideInterval);

    function nextSlide() {
        if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
            sliderList.style.transform = "translate(0, 0)";
            slideNow = 1;
        } else {
            translateWidth = -document.querySelector(".slider__viewport").offsetWidth * slideNow;
            sliderList.style.transform = "translate("+ translateWidth + "px, 0)";
            slideNow++;
        }
    }

    function prevSlide() {
        if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
            translateWidth = -document.querySelector(".slider__viewport").offsetWidth * (slideCount - 1);
            sliderList.style.transform = "translate("+ translateWidth + "px, 0)";
            slideNow = slideCount;
        } else {
            translateWidth = -document.querySelector(".slider__viewport").offsetWidth * (slideNow - 2);
            sliderList.style.transform = "translate("+ translateWidth + "px, 0)";
            slideNow--;
        }
    }

    next.addEventListener("click", nextSlide, false);
    prev.addEventListener("click", prevSlide, false);

  });


/*===============================================================================================================
                                                DROPDOWN MENU
================================================================================================================*/

    var navMain = document.querySelector('.main-nav');
    var navToggle = document.querySelector('.main-nav__toggle');

    navMain.classList.remove('main-nav--nojs');

    navToggle.addEventListener('click', function() {
      if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
      } else {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
      }
    });

      // function initMap() {
      //   var uluru = {lat: -25.363, lng: 131.044};
      //   var map = new google.maps.Map(document.getElementById('map'), {
      //     zoom: 4,
      //     center: uluru
      //   });
      //   var marker = new google.maps.Marker({
      //     position: uluru,
      //     map: map
      //   });
      // }

})()
