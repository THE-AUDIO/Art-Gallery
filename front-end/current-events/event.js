window.addEventListener('DOMContentLoaded',()=>{
    // declaration des éléments HTML
    const profil = document.getElementById('profil');
    const eltProfil = document.getElementById('elt-profil');
    container = document.getElementById('container');
    const allPost = container.querySelectorAll('.post');
    // console.log(allPost);
    

    // all event........

    // gestion du click sur le profil
    profil.addEventListener('click',()=>{
        eltProfil.classList.toggle('none-profil');
    });
})