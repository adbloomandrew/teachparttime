// Smooth scroll to anchor
$(document).ready(function() {
  $('.js-smooth-scroll').on('click', function(e) {
    smoothScrollTo(this.hash, e);
  });
});

$(window).on('load',function() {
  smoothScrollTo(window.location.hash);
});

function smoothScrollTo(hash, e) {
  if(hash === '') {
    return false;
  } else {
    if($(hash).length > 0) {
      if(typeof e !== 'undefined') {
        e.preventDefault();
        history.pushState(null, null, $(e.target).attr('href'));
      }
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 20
      }, 350);
    }
  }
}
