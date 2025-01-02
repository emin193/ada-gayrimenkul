
document.addEventListener("DOMContentLoaded", function () {
    // Elemanlar
    const moreDetailsButtons = document.querySelectorAll('.btn-details');
    const closeDetailsButtons = document.querySelectorAll('.btn-close-details');
    const extraDetailsSections = document.querySelectorAll('.extra-details');
    let galleryImages = [];
    let currentImageIndex = 0;
    let currentGallery = [];

    // Modal yapısını oluşturma
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalClose = document.createElement('span');
    const modalPrev = document.createElement('span');
    const modalNext = document.createElement('span');

    modal.classList.add('modal');
    modalContent.classList.add('modal-content');
    modalClose.classList.add('modal-close');
    modalPrev.classList.add('modal-nav', 'modal-prev');
    modalNext.classList.add('modal-nav', 'modal-next');
    modalPrev.innerHTML = '←';
    modalNext.innerHTML = '→';
    modalClose.innerHTML = '&times;';

    modal.style.display = 'none'; // Modal başlangıçta gizli
    modalContent.appendChild(modalClose);
    modalContent.appendChild(modalPrev);
    modalContent.appendChild(modalNext);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // "Daha Fazla Detay" butonlarının işlevi
    moreDetailsButtons.forEach((button, index) => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            extraDetailsSections[index].classList.add('active');
            button.style.display = 'none';

            // Kartın fotoğraflarını ve galeriyi hazırla
            galleryImages = extraDetailsSections[index].querySelectorAll('.gallery-img');
            currentGallery = Array.from(galleryImages);

            // Fotoğraflar tıklanabilir hale gelsin
            galleryImages.forEach((img) => {
                img.addEventListener('click', function () {
                    currentImageIndex = currentGallery.indexOf(img);
                    updateModalImage();
                    modal.style.display = 'flex';
                    updateNavigationButtons();
                });
            });
        });
    });

    // "Detayları Kapat" butonlarının işlevi
    closeDetailsButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            extraDetailsSections[index].classList.remove('active');
            moreDetailsButtons[index].style.display = 'inline-block';
        });
    });

    // Modal önceki resim işlevi
    modalPrev.addEventListener('click', function () {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateModalImage();
            updateNavigationButtons();
        }
    });

    // Modal sonraki resim işlevi
    modalNext.addEventListener('click', function () {
        if (currentImageIndex < currentGallery.length - 1) {
            currentImageIndex++;
            updateModalImage();
            updateNavigationButtons();
        }
    });

    // Modal kapatma işlevi
    modalClose.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Modal dışına tıklanırsa kapatma
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Modal resmi güncelleme
    function updateModalImage() {
        const existingImg = modalContent.querySelector('img');
        if (existingImg) {
            modalContent.removeChild(existingImg);
        }
        const newImg = document.createElement('img');
        newImg.src = currentGallery[currentImageIndex].src;
        modalContent.insertBefore(newImg, modalPrev);
    }

    // Navigasyon butonlarını güncelleme
    function updateNavigationButtons() {
        modalPrev.style.display = currentImageIndex === 0 ? 'none' : 'block';
        modalNext.style.display = currentImageIndex === currentGallery.length - 1 ? 'none' : 'block';
    }

    // Estetik detay geçişlerini kontrol etme
    function animateDetailsSection(section, show) {
        if (show) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        } else {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            setTimeout(() => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
            }, 50);
        }
    }
});






