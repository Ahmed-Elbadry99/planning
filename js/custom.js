$(document).ready(function () {
    $('#membershipAccordion .card-header').on('click', function () {
      // اغلق الكل
      $('#membershipAccordion .card-header').attr('aria-expanded', 'false');
      // لو العنصر مش مفتوح، افتحه
      var target = $(this).data('target');
      if (!$(target).hasClass('show')) {
        $(this).attr('aria-expanded', 'true');
      }
    });
  });
  


  // services pop up

  function openPopup(num) {
    document.getElementById("popup" + num).style.display = "flex";
  }
  function closePopup(num) {
    document.getElementById("popup" + num).style.display = "none";
  }

  function initSliders() {
  // Unslick لو كانت متفعلة بالفعل
  if ($('.slider-for').hasClass('slick-initialized')) {
    $('.slider-for').slick('unslick');
  }
  if ($('.slider-nav').hasClass('slick-initialized')) {
    $('.slider-nav').slick('unslick');
  }

  // إعادة تهيئة slider-for
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.slider-nav'
  });

  // إعداد slider-nav حسب العرض
  const isMobile = $(window).width() <= 992;

  $('.slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
     arrows: false,
    centerMode: false,
    focusOnSelect: true,
    vertical: !isMobile // عمودي فقط إذا الشاشة أكبر من 992
  });
}

// أول تحميل
$(document).ready(function () {
  initSliders();
});

// إعادة تهيئة عند تغيير حجم الشاشة
$(window).on('resize', function () {
  clearTimeout(window.resizingSlick); // تأخير منعًا للتكرار
  window.resizingSlick = setTimeout(function () {
    initSliders();
  }, 300);
});


