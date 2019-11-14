function addCarouselListeners() {
    const carouselInner = document.getElementById("carouselInner")
    const carouselBtnNext = document.getElementById("next-slide-btn")
    const carouselBtnPrev = document.getElementById("prev-slide-btn")

    carouselBtnNext.addEventListener("click", nextSlide)
    carouselBtnPrev.addEventListener("click", prevSlide)

    function nextSlide(ev) {
        ev.preventDefault()
        let nextCarouselItem
        const carouselActive = carouselInner.querySelector(".active")
        let current = parseInt(carouselActive.dataset.carousel_pic_id)
        carouselActive.className = "carousel-item" 
        if(current !== 4){
            nextCarouselItem = carouselInner.querySelector(`[data-carousel_pic_id="${current+1}"]`)
        }else{
            nextCarouselItem = carouselInner.querySelector(`[data-carousel_pic_id="1"]`)
        }
        nextCarouselItem.className = "carousel-item active"
    }
    function prevSlide(ev) {
        ev.preventDefault()
        let nextCarouselItem
        const carouselActive = carouselInner.querySelector(".active")
        let current = parseInt(carouselActive.dataset.carousel_pic_id)
        carouselActive.className = "carousel-item" 
        if(current !== 1){
            nextCarouselItem = carouselInner.querySelector(`[data-carousel_pic_id="${current-1}"]`)
        }else{
            nextCarouselItem = carouselInner.querySelector(`[data-carousel_pic_id="4"]`)
        }
        nextCarouselItem.className = "carousel-item active"
    }
}