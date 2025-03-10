
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
function toggleReadMore() {
  let moreText = document.getElementById("more-text");
  let dots = document.getElementById("dots");
  let btnText = document.getElementById("readMoreBtn");

  if (moreText.classList.contains("hidden")) {
      moreText.classList.remove("hidden");
      dots.style.display = "none";
      btnText.textContent = "Read Less";
  } else {
      moreText.classList.add("hidden");
      dots.style.display = "inline";
      btnText.textContent = "Read More";
  }
}



// flash message show 
    setTimeout(function () {
      let flashMessages = document.querySelectorAll('.flash-message');
      flashMessages.forEach(msg => {
          msg.style.opacity = '0';
          setTimeout(() => msg.remove(), 500); 
      });
  }, 3000); 
  

// scrolle up 

document.addEventListener("DOMContentLoaded", function () {
  let goTopBtn = document.getElementById("goTopBtn");

  window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
          goTopBtn.classList.remove("hidden"); 
      } else {
          goTopBtn.classList.add("hidden"); 
      }
  });

  function slowScrollToTop() {
      let scrollPosition = window.scrollY;

      function scrollStep() {
          if (scrollPosition > 0) {
              scrollPosition -= Math.max(10, scrollPosition / 10); 
              window.scrollTo(0, scrollPosition);
              requestAnimationFrame(scrollStep);
          }
      }

      requestAnimationFrame(scrollStep);
  }
  window.scrollToTop = function () {
      slowScrollToTop();

      setTimeout(() => goTopBtn.classList.add("hidden"), 3000);
  };
});
