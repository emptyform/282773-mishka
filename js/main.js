/*====================================================================
                                SLIDER
======================================================================*/
(function() {
  // "use strict";

  var slideNow = 1;
  var sliderList = document.querySelector(".slider__list");
  var slideCount = document.querySelector(".slider__list").children.length;
  var translateWidth = 0;
  // var slideInterval = 5000;
  var next = document.querySelector(".slider__btn--next");
  var prev = document.querySelector(".slider__btn--prev");

  document.addEventListener('DOMContentLoaded', function() {
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
    };

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
    };

      next.addEventListener("click", nextSlide, false);
      prev.addEventListener("click", prevSlide, false);

  });

})();
/*===============================================================================================================
                                                MODAL
================================================================================================================*/
(function() {

    var modal = document.getElementById("popup");
    var modalBtnShow = document.querySelector(".featured__btn");
    var modalBtnHide = document.querySelector(".modal__btn");
    var wrapper = document.querySelector(".wrapper");
    var basket = document.querySelectorAll(".product-card__basket");
    // console.log(basket)

      function creatOverlay() {
        var docHeight = document.body.offsetHeight;
        wrapper.classList.add("wrap-visible");
        wrapper.style.height = docHeight + "px";
      }

      function showModal(event) {
        event.preventDefault();

        creatOverlay();
        modal.classList.add("modal--visible");
      }

      function hideModal(event) {
        event.preventDefault();
        modal.classList.remove("modal--visible");
        wrapper.classList.remove("wrap-visible")
        wrapper.style.height = 0;
      }

      modalBtnShow.addEventListener("click", showModal, false);
      modalBtnHide.addEventListener("click", hideModal, false);
      wrapper.addEventListener("click", hideModal, false);
      basket.forEach(function(item) {
        item.addEventListener("click", showModal, false);
      });

})();


/*-----------------------------------------------------------------------------------
                                          DROPDOWN
-------------------------------------------------------------------------------------*/
(function() {

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

})();

/*--------------------------------------------------------------------------
                              GOOGLE MAPS API
-----------------------------------------------------------------------------*/
 (function() {
    var image = 'img/icon-map-pin.svg';

    function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 59.938631, lng: 30.323055},
        zoom: 17
      });

      var beachMarker = new google.maps.Marker({
        position: {lat: 59.938631, lng: 30.323055},
        map: map,
        title: "интернет-магазин Мишка",
        icon: image
      });
    };

})();



