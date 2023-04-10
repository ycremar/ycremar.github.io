document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("scroll", function() {
    let denoisedImg = document.getElementById("denoised-img");
    let header = document.getElementById("header");
    let headerHeight = header.offsetHeight;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let windowHeight = window.innerHeight;


    var body = document.body,
    html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
      html.clientHeight, html.scrollHeight, html.offsetHeight );

    if (scrollTop >= headerHeight - windowHeight) {
      // let opacity = (scrollTop - (headerHeight - windowHeight)) / windowHeight; 
      let opacity = 1 - (height - scrollTop*2) / height;
      denoisedImg.style.opacity = Math.sqrt(Math.min(opacity, 1));
    } else {
      denoisedImg.style.opacity = 0;
    }
  });
});