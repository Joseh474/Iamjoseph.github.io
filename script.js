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

    
    