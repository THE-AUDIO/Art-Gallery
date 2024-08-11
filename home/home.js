document.addEventListener('scroll', function() {
  const images = document.querySelectorAll('.gallery_img');
  const windowHeight = window.innerHeight;

  images.forEach(image => {
    // position du bord superieur de l'image par rapport à la fenêtre de visualisation.
    const imageTop = image.getBoundingClientRect().top;

    // position du bord inférieur de l'image par rapport à la fenêtre de visualisation.
    const imageBottom = image.getBoundingClientRect().bottom;
    
    // Vérifie si l'image est dans la vue
    if (imageTop < windowHeight - 100 && imageBottom >= 0) {
      image.classList.add('visible');
    }
    else{
      image.classList.remove('visible');
    }
  });
});
