// Get Element HTML

const carouselSlide = document.querySelector('.carousel-slide') // container for all image

const carouselImages = document.querySelectorAll('.carousel-slide img')

const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')

const indicators = document.querySelectorAll('.indicator')

let currentIndex = 0 // state current index
const totalImages = carouselImages.length

let autoSlideInterval; // variable to save interval for auto slide

function updateCarousel(){
    carouselSlide.style.transform =   `translateX(${-currentIndex *100}%)`

    //update active indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex)
    })
}

function nextSlide(){
    currentIndex = (currentIndex + 1) % totalImages
    updateCarousel()
    resetAutoSlide()
}

function prevSlide(){
    currentIndex = (currentIndex - 1 + totalImages) % totalImages
    updateCarousel()
    resetAutoSlide()
}

function resetAutoSlide(){
    clearInterval(autoSlideInterval)

    autoSlideInterval = setInterval(nextSlide, 5000)
}

// add event listener for next
nextBtn.addEventListener('click', nextSlide)

// add event listener for prev
prevBtn.addEventListener('click', prevSlide)

autoSlideInterval = setInterval(nextSlide, 5000)

// add event listener for indicators

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index
        updateCarousel()
        resetAutoSlide()
    })
})

