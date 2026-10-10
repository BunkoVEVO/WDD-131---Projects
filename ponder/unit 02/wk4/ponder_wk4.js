
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

gallery.addEventListener('click', openModal);

function openModal(e) {
    // Make sure the clicked element is an image
    if (e.target.tagName !== 'IMG') {
        return;
    }

    // Get the image source and replace -sm with -full
    const imageSrc = e.target.src;
    const largeImageSrc = imageSrc.replace('-sm', '-full');

    // Set the modal image
    modalImage.src = largeImageSrc;
    modalImage.alt = e.target.alt;

    // Open the modal
    modal.showModal();
}

// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});
