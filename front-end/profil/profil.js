

document.addEventListener("DOMContentLoaded", function () {
    let container_profil = document.getElementById('profil-container');
    let btn = document.getElementById('up')
    let identifiant = document.getElementById('identifiant')
    let selection = document.getElementById('selection')
    let post = document.getElementById('post')
    let positionInitial = 200;

    function toggleClass() {
        container_profil.classList.toggle('up-container')
        identifiant.classList.toggle('up-container')
        selection.classList.toggle('up-container')
        post.classList.toggle('up-container')
        post.classList.toggle('up-post');
    }
    btn.addEventListener('click', toggleClass)
    var states = true;
    post.addEventListener('scroll', () => {
        console.log(post.scrollTop);
        if (post.scrollTop >= positionInitial && states) {
                toggleClass();
                states = false;
        } else if (post.scrollTop  <= positionInitial && !states) {
                states = true;
                toggleClass();
        }
    });
})