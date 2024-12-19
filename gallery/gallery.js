const swiper = new Swiper('.swiper', {
    loop: true, 
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination', 
        clickable: true,
        type: 'bullets',  
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    spaceBetween: 10, 
    breakpoints: {
        640: {
            slidesPerView: 1, 
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2, 
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3, 
            spaceBetween: 30,
        },
    },
});

const accessKey = 'kqoZZj0BOnyInyTzbA41KZ2sNlYfpaR7SmC7Z5BmqoM'; 

fetch(`https://api.unsplash.com/photos?client_id=${accessKey}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(photo => {
            // Unsplash
            const slideHTML = `
                <div class="swiper-slide">
                    <img src="${photo.urls.regular}" alt="${photo.alt_description}" style="object-fit: cover;">
                    <p class="author">Photo by <a href="${photo.user.links.html}" target="_blank">${photo.user.name}</a> on Unsplash</p>
                </div>
            `;
            swiper.appendSlide(slideHTML); // Add slide to Swiper
        });

        swiper.update(); // Update Swiper after adding the slides
    })
    .catch(error => console.error('Error:', error));

// Pause autoplay on mouse enter, resume on mouse leave
const swiperWrapper = document.querySelector('.swiper-wrapper');

swiperWrapper.addEventListener('mouseenter', () => {
    swiper.autoplay.stop(); // Stop autoplay when mouse enters the swiper
});

swiperWrapper.addEventListener('mouseleave', () => {
    swiper.autoplay.start(); // Start autoplay when mouse leaves the swiper
});