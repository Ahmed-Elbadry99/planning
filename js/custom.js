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
  