
  
  const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const radioButtons = document.querySelectorAll(".radio-button");
let currentIndex = 0;
let isSliding = false;
let autoSlideInterval;

// Function to go to a specific slide
function goToSlide(index) {
    if (!isSliding) {
        currentIndex = index;
        const translateX = -currentIndex * slides[0].clientWidth;
        slider.style.transform = `translateX(${translateX}px)`;
        radioButtons[currentIndex].checked = true; // Update radio button selection
    }
}

// Function to handle radio button change
function handleRadioChange() {
    clearInterval(autoSlideInterval); // Clear the automatic sliding interval
    const checkedRadio = document.querySelector('input[name="slider-radio"]:checked');
    if (checkedRadio) {
        const index = Array.from(radioButtons).indexOf(checkedRadio);
        goToSlide(index);
    }
    // Restart automatic sliding after 3 seconds
    autoSlideInterval = setInterval(nextSlide, 7000);
}

// Add event listeners to the radio buttons
radioButtons.forEach((radio) => {
    radio.addEventListener("change", handleRadioChange);
});

// Automatic sliding
function nextSlide() {
    if (!isSliding) {
        currentIndex = (currentIndex + 1) % slides.length;
        radioButtons[currentIndex].checked = true; // Update radio button selection
        goToSlide(currentIndex);
    }
}

// Start automatic sliding
autoSlideInterval = setInterval(nextSlide, 6000); // Change image every 3 seconds

// Manual sliding with button click
function prevSlide() {
    if (!isSliding) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        radioButtons[currentIndex].checked = true; // Update radio button selection
        goToSlide(currentIndex);
    }
}

document.getElementById("next-button").addEventListener("click", nextSlide);
document.getElementById("prev-button").addEventListener("click", prevSlide);

// Manual sliding with touch support
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const touchDiff = touchStartX - touchEndX;

    if (touchDiff > 50) {
        prevSlide(); // Swipe right for previous image
    } else if (touchDiff < -50) {
        nextSlide(); // Swipe left for next image
    }
});
  v