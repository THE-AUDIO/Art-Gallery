

document.addEventListener("DOMContentLoaded", function () {
    let container_profil = document.getElementById('profil-container');
    let identifiant = document.getElementById('identifiant')
    let selection = document.getElementById('selection')
    let post = document.getElementById('post')
    const btn_up = document.getElementById('btn-float')
    btn_up.style.opacity='0'
    let positionInitial = 200;

    function toggleClass() {
        container_profil.classList.toggle('up-container')
        identifiant.classList.toggle('up-container')
        selection.classList.toggle('up-container')
        post.classList.toggle('up-container')
        post.classList.toggle('up-post');
    }
    var states = true;
    post.addEventListener('scroll', () => {
        if (post.scrollTop >= positionInitial && states) {
                toggleClass();
                states = false;
                btn_up.style.opacity='1'
        } else if (post.scrollTop  <= positionInitial && !states) {
                states = true;
                toggleClass();
                btn_up.style.opacity='0'

        }
    });

    btn_up.addEventListener('click', () =>{
        console.log(1);
        post.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
})