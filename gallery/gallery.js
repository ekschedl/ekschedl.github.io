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
            
            const slideHTML = `
                <div class="swiper-slide">
                    <img src="${photo.urls.regular}" alt="${photo.alt_description}" style="object-fit: cover;">
                    <p class="author">Photo by <a href="${photo.user.links.html}" target="_blank">${photo.user.name}</a> on Unsplash</p>
                </div>
            `;
            swiper.appendSlide(slideHTML); 

       
            const imgElement = document.querySelector(`img[src="${photo.urls.regular}"]`);
            imgElement.addEventListener('click', () => {
                triggerDownload(photo.urls.full); 
            });
        });
    })
    .catch(error => console.error('Error:', error));


function triggerDownload(imageUrl) {
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = ''; 
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink); 
}