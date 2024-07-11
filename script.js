const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 100);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');  
    navlist.classList.toggle('open');  
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
};

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        // Check if the clicked element is not the "Read More" link or its parent
        if (!event.target.closest('.read')) {
            // Hide all additional content
            document.querySelectorAll('.additional-content').forEach(function (content) {
                content.style.display = 'none';
            });
        }
    });

    // Toggle visibility of additional content when "Read More" link is clicked
    document.querySelectorAll('.read').forEach(function (readMoreLink) {
        readMoreLink.addEventListener('click', function (event) {
            event.preventDefault();
            var additionalContent = this.nextElementSibling;
            additionalContent.style.display = additionalContent.style.display === 'none' ? 'block' : 'none';
        });
    });

    // Initialize EmailJS
    (function(){
        emailjs.init("t5JAZ9JAYxaX_sDVO");
    })();

    document.getElementById('JosephMwanzia').addEventListener('submit', function(event) {
        event.preventDefault();

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var mobile = document.getElementById('mobile').value;
        var message = document.getElementById('message').value;

        var templateParams = {
            from_name: name,
            from_email: email,
            from_mobile: mobile,
            message: message
        };

        emailjs.send('service_10rcju9', 'template_fyf6y5a', templateParams)
            .then(function(response) {
                alert('Message sent successfully!');
            }, function(error) {
                alert('Failed to send message. Please try again later.');
            });
    });

    // Initialize the Owl Carousel
    $('.owl-carousel').owlCarousel({
        items: 1, // Number of items per slide
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
    });
});

function toggleContent(link) {
    var additionalContent = link.nextElementSibling;
    if (additionalContent.style.display === 'none') {
        additionalContent.style.display = 'block';
        link.textContent = 'Read Less'; // Change text to "Read Less" when additional content is displayed
    } else {
        additionalContent.style.display = 'none';
        link.textContent = 'Read More'; // Change text back to "Read More" when additional content is hidden
    }
}


const cube = document.querySelector(".cube");
let mouseX = 0;
let mouseY = 0;

const handleMouseMove = (event) => {
    console.log("MouseX: ",event.clientX);
    console.log("MouseY: ",event.clientY);

};

window.addEventListener("mousemove", handleMouseMove);


const body = document.querySelector("body"),
  toggle = document.querySelector(".toggle");

  let getMode = localStorage.getItem("mode");
  if(getMode && getMode === "dark"){
    body.classList.add("dark");
    toggle.classList.add("active")
  }


  toggle.addEventListener("click",()=>{
    body.classList.toggle("dark");

    if(!body.classList.contains("dark")){
        return localStorage.setItem("mode","light");
    }
    localStorage.setItem("mode","dark");
  });
  toggle.addEventListener("click",()=> toggle.classList.toggle("active"));

  /======= swiper =======/

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
