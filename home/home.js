document.addEventListener('scroll', function() {
  const images = document.querySelectorAll('.gallery_img');
  const windowHeight = window.innerHeight;
//getBoundingClientRect()
  images.forEach(image => {
    const imageTop = image.getBoundingClientRect().top;
    const imageBottom = image.getBoundingClientRect().bottom;
    if (imageTop < windowHeight - 100 && imageBottom >= 0) {
      image.classList.add('visible');
    }
    else{
      image.classList.remove('visible');
    }
  });
});
