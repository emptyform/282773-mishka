;(function() {
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

})()
