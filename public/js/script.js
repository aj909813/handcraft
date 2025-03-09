
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
  


//upper navbar active links
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



//small screen search function
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



// read more button
    function toggleText() {
        var shortText = document.getElementById("shortText");
        var fullText = document.getElementById("fullText");
        var btn = document.getElementById("readMoreBtn");

        if (fullText.style.display === "none") {
            fullText.style.display = "block";
            shortText.style.display = "none";
            btn.innerText = "Read Less";
        } else {
            fullText.style.display = "none";
            shortText.style.display = "block";
            btn.innerText = "Read More";
        }
    }

// footer upper scroller bar

document.addEventListener("DOMContentLoaded", function () {
  let scrollTopBtn = document.getElementById("scrollTopBtn");

  // Scroll Event - Show/Hide Button
  window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
          scrollTopBtn.classList.add("show");
      } else {
          scrollTopBtn.classList.remove("show");
      }
  });

  // Smooth Scroll Function
  function smoothScrollToTop() {
      let currentPosition = window.scrollY;
      if (currentPosition > 0) {
          window.scrollTo(0, currentPosition - currentPosition / 10);
          requestAnimationFrame(smoothScrollToTop);
      }
  }

  // Click Event - Start Smooth Scroll
  scrollTopBtn.addEventListener("click", function () {
      requestAnimationFrame(smoothScrollToTop);
  });
});











