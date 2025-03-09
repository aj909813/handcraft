
// swiper aworo
var swiper = new Swiper(".mySwiper", {
    loop: true, // Infinite Loop
    autoplay: {
      delay: 3000, // 3 seconds
      disableOnInteraction: false, // Continue autoplay after interaction
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  



  document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-item a");
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.parentElement.classList.add("active");
        } else {
            link.parentElement.classList.remove("active");
        }
    });
});




document.getElementById("searchIcon").addEventListener("click", function() {
  let searchContainer = document.getElementById("searchContainer");
  searchContainer.classList.remove("d-none");
  searchContainer.style.display = "flex";
  document.querySelector("#searchContainer input").focus(); // Auto focus input
});

document.getElementById("closeSearch").addEventListener("click", function() {
  let searchContainer = document.getElementById("searchContainer");
  searchContainer.style.display = "none";
});

// Form submit event to hide search bar after submission
document.getElementById("searchForm").addEventListener("submit", function() {
  let searchContainer = document.getElementById("searchContainer");
  searchContainer.style.display = "none";
});

// Enter key press should trigger form submission
document.querySelector("#searchContainer input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      event.preventDefault(); // Stop default action
      document.getElementById("searchForm").submit(); // Manually submit
  }
});








