document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("scroll", function() {
    let denoisedImg = document.getElementById("denoised-img");
    let header = document.getElementById("header");
    let headerHeight = header.offsetHeight;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let windowHeight = window.innerHeight;

    if (scrollTop >= headerHeight - windowHeight) {
      let opacity = (scrollTop - (headerHeight - windowHeight)) / windowHeight;
      denoisedImg.style.opacity = opacity;
    } else {
      denoisedImg.style.opacity = 0;
    }
  });
});