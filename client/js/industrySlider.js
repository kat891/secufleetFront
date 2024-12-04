const Islider = document.querySelector('.Islider');
const Islides = document.querySelectorAll('.Islide');
const IprevArrow = document.getElementById('IprevArrow');
const InextArrow = document.getElementById('InextArrow');
let IcurrentIndex = 0;
let IslidesToShow = getSlidesToShow();
const ItotalSlides = Islides.length;
let autoSlideInterval; 
console.log("total slides", ItotalSlides);

function getSlidesToShow() {
    const width = window.innerWidth;
    if (width <= 480) {
        return 1; 
    } else if (width <= 768) {
        return 2;
    } else {
        return 3;
    }
}

function IupdateSlider() {
    
    const gapPercentage = 2; 
    const slideWidth = (100 / IslidesToShow);
    Islider.style.transform = `translateX(-${IcurrentIndex * (slideWidth + gapPercentage)}%)`;
}


function InextSlide() {
    IcurrentIndex = (IcurrentIndex + 1) % (ItotalSlides - IslidesToShow + 1);
    IupdateSlider();
}

function IprevSlide() {
    IcurrentIndex = (IcurrentIndex - 1 + (ItotalSlides - IslidesToShow + 1)) % (ItotalSlides - IslidesToShow + 1);
    IupdateSlider();
}

IprevArrow.addEventListener('click', IprevSlide);
InextArrow.addEventListener('click', InextSlide);

// Auto-slide interval
function startAutoSlide() {
    clearInterval(autoSlideInterval);  
    autoSlideInterval = setInterval(InextSlide, 3000);  
}

startAutoSlide();


let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
       
        IslidesToShow = getSlidesToShow();
        IcurrentIndex = 0;
        IupdateSlider();
        startAutoSlide();
    }, 200); 
});

