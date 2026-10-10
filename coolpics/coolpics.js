
/* Mobile menu */
const menuButton = document.querySelector('.menu-btn');
const navigation = document.querySelector('nav');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('hide');
    menuButton.classList.toggle('change');
});


/* Image modal */
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

gallery.addEventListener('click', openModal);

function openModal(e) {
    // Only open the modal when an image is clicked
    if (e.target.tagName !== 'IMG') {
        return;
    }

    // Find the high-resolution image
    const imageSrc = e.target.src;
    const largeImageSrc = imageSrc.replace('-sm', '-full');

    // Update the modal image
    modalImage.src = largeImageSrc;
    modalImage.alt = e.target.alt;

    // Display the modal
    modal.showModal();
}

// Close using the X button
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close when clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});
