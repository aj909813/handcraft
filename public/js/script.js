
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


// flash message show 
    setTimeout(function () {
      let flashMessages = document.querySelectorAll('.flash-message');
      flashMessages.forEach(msg => {
          msg.style.opacity = '0';
          setTimeout(() => msg.remove(), 500); // Remove after fade out
      });
  }, 3000); // Message disappears after 3 seconds
  

// scrolle up 

document.addEventListener("DOMContentLoaded", function () {
  let goTopBtn = document.getElementById("goTopBtn");

  // Show button when user scrolls down
  window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
          goTopBtn.classList.remove("hidden"); // Show button
      } else {
          goTopBtn.classList.add("hidden"); // Hide button
      }
  });

  // Function to smoothly scroll to the top with slow animation
  function slowScrollToTop() {
      let scrollPosition = window.scrollY;
      let interval = setInterval(function () {
          if (scrollPosition > 0) {
              scrollPosition -= 20; // Adjust speed (Lower value = Slower Scroll)
              window.scrollTo(0, scrollPosition);
          } else {
              clearInterval(interval); // Stop when reached top
          }
      }, 10); // Adjust interval timing (Higher value = Smoother Scroll)
  }

  // Attach function to button
  window.scrollToTop = function () {
      slowScrollToTop();

      // Hide button after 3 seconds
      setTimeout(() => goTopBtn.classList.add("hidden"), 3000);
  };
});












