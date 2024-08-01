window.addEventListener('DOMContentLoaded',()=>{
    // declaration des éléments HTML
    const profil = document.getElementById('profil');
    const eltProfil = document.getElementById('elt-profil');
    container = document.getElementById('container');
    const allPost = container.querySelectorAll('.post');
    // element at alpost
     allPost.forEach(element => {
            const btnLike = element.children[0].children[1].children[0];
            let containerLike = element.children[0].children[1].children[1];
            let nbLike = +element.children[0].children[1].children[1].textContent;
            btnLike.addEventListener('click',()=>{
                containerLike.textContent='';
                nbLike ++;
                containerLike.textContent =`${nbLike}`
            })
     });

    // all event........

    // gestion du click sur le profil
    profil.addEventListener('click',()=>{
        eltProfil.classList.toggle('none-profil');
    });
})